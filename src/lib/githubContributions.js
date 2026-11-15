const GRAPHQL_LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4
};

function clampLevel(level) {
  const num = Number(level);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(4, Math.round(num)));
}

function getUtcDayAndWeekKey(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const dow = utcDate.getUTCDay();
  const sunday = new Date(Date.UTC(year, month - 1, day - dow));
  const weekKey = sunday.toISOString().slice(0, 10);
  return { dow, weekKey };
}

function parseTooltipCount(rawText) {
  const clean = rawText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return 0;
  if (/^no\s+contributions?\b/i.test(clean)) return 0;
  const match = clean.match(/^(\d[\d,]*)\s+contributions?\b/i);
  if (!match) return 0;
  return Number.parseInt(match[1].replace(/,/g, ""), 10) || 0;
}

/**
 * Menormalkan daftar hari kontribusi ke kolom minggu (Minggu-Sabtu) agar seragam antara HTML dan GraphQL.
 */
export function normalizeContributionCalendar({ days, totalContributions, source }) {
  if (!Array.isArray(days) || days.length === 0) {
    return null;
  }

  const byDate = new Map();
  for (const item of days) {
    if (!item || typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
      continue;
    }
    const count = Math.max(0, Math.round(Number(item.count) || 0));
    byDate.set(item.date, {
      date: item.date,
      count,
      level: clampLevel(item.level)
    });
  }

  if (byDate.size === 0) {
    return null;
  }

  const sortedDays = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const weekBuckets = new Map();

  for (const day of sortedDays) {
    const { dow, weekKey } = getUtcDayAndWeekKey(day.date);
    if (!weekBuckets.has(weekKey)) {
      weekBuckets.set(weekKey, Array(7).fill(null));
    }
    weekBuckets.get(weekKey)[dow] = day;
  }

  const weeks = [...weekBuckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, cells]) => cells);

  const computedTotal = sortedDays.reduce((sum, day) => sum + day.count, 0);
  const resolvedTotal =
    typeof totalContributions === "number" && Number.isFinite(totalContributions) && totalContributions >= 0
      ? Math.round(totalContributions)
      : computedTotal;

  return {
    source,
    totalContributions: resolvedTotal,
    rangeStart: sortedDays[0].date,
    rangeEnd: sortedDays[sortedDays.length - 1].date,
    weeks
  };
}

/**
 * Mengurai HTML kalender kontribusi publik GitHub (/users/<handle>/contributions).
 * shortcut: mengandalkan atribut data-date, data-level, dan elemen tool-tip HTML publik GitHub bila GITHUB_TOKEN kosong; beralih ke GraphQL jika markup berubah.
 */
export function parseGithubContributionsHtml(html) {
  if (typeof html !== "string" || !html.trim()) {
    return null;
  }

  const tooltipCountById = new Map();
  const tooltipRegex = /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi;
  for (const match of html.matchAll(tooltipRegex)) {
    const attrs = match[1];
    const forMatch = attrs.match(/\bfor=["']([^"']+)["']/i);
    if (forMatch) {
      tooltipCountById.set(forMatch[1], parseTooltipCount(match[2]));
    }
  }

  const days = [];
  const tdRegex = /<td\b([^>]*)>/gi;
  for (const match of html.matchAll(tdRegex)) {
    const attrs = match[1];
    const dateMatch = attrs.match(/\bdata-date=["'](\d{4}-\d{2}-\d{2})["']/i);
    const levelMatch = attrs.match(/\bdata-level=["']([0-4])["']/i);
    if (!dateMatch || !levelMatch) continue;

    const idMatch = attrs.match(/\bid=["']([^"']+)["']/i);
    const count = idMatch && tooltipCountById.has(idMatch[1])
      ? tooltipCountById.get(idMatch[1])
      : 0;

    days.push({
      date: dateMatch[1],
      level: Number.parseInt(levelMatch[1], 10),
      count
    });
  }

  const headingMatch = html.match(
    /<h2\b[^>]*\bid=["']js-contribution-activity-description["'][^>]*>([\s\S]*?)<\/h2>/i
  );
  let totalContributions;
  if (headingMatch) {
    const headingText = headingMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const totalMatch = headingText.match(/([\d,]+)\s+contributions?\b/i);
    if (totalMatch) {
      totalContributions = Number.parseInt(totalMatch[1].replace(/,/g, ""), 10);
    }
  }

  return normalizeContributionCalendar({
    days,
    totalContributions,
    source: "github-html"
  });
}

/**
 * Mengurai respons GraphQL contributionCalendar GitHub ketika GITHUB_TOKEN tersedia di server.
 */
export function parseGithubGraphqlCalendar(calendar) {
  if (!calendar || !Array.isArray(calendar.weeks)) {
    return null;
  }

  const days = [];
  for (const week of calendar.weeks) {
    if (!week || !Array.isArray(week.contributionDays)) continue;
    for (const day of week.contributionDays) {
      if (!day || typeof day.date !== "string") continue;
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: GRAPHQL_LEVEL_MAP[day.contributionLevel] ?? 0
      });
    }
  }

  return normalizeContributionCalendar({
    days,
    totalContributions: calendar.totalContributions,
    source: "github-graphql"
  });
}
