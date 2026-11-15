import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { PROFILE_DATA } from "../src/data/profileData.js";
import { SKILL_GROUPS } from "../src/data/techData.js";
import {
  FEATURED_PROJECTS,
  ARCHIVE_PROJECTS
} from "../src/data/projectsData.js";
import { CERTIFICATES } from "../src/data/certificatesData.js";
import { JOURNEY_CHAPTERS } from "../src/data/journeyData.js";
import {
  parseGithubContributionsHtml,
  parseGithubGraphqlCalendar
} from "../src/lib/githubContributions.js";

const ROOT = process.cwd();

function listFilesRecursive(dirPath) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

test("semua ikon SKILL_GROUPS terpetakan di TechStackIcon.jsx", () => {
  const iconSource = fs.readFileSync(
    path.join(ROOT, "src/components/ui/TechStackIcon.jsx"),
    "utf8"
  );
  const blockMatch = iconSource.match(/export const TECH_STACK_KEYS\s*=\s*\[([\s\S]*?)\];/);
  assert.ok(blockMatch, "TECH_STACK_KEYS harus diekspor di TechStackIcon.jsx");

  const registeredKeys = new Set(
    [...blockMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  );

  assert.ok(SKILL_GROUPS.length > 0, "SKILL_GROUPS tidak boleh kosong");
  for (const group of SKILL_GROUPS) {
    assert.ok(group.items.length > 0, `Grup ${group.id} tidak boleh kosong`);
    for (const skill of group.items) {
      assert.ok(skill.id && skill.label && skill.fullLabel, "Properti skill tidak lengkap");
      assert.ok(
        registeredKeys.has(skill.icon),
        `Ikon "${skill.icon}" untuk "${skill.label}" belum terdaftar di TechStackIcon.jsx`
      );
      assert.ok(
        iconSource.includes(`case "${skill.icon}":`),
        `Cabang switch untuk "${skill.icon}" belum ada di TechStackIcon.jsx`
      );
    }
  }
});

test("aset lokal di folder public tersedia untuk profil, CV, dan sertifikat", () => {
  assert.ok(
    Array.isArray(PROFILE_DATA.aboutPhotos) && PROFILE_DATA.aboutPhotos.length >= 2,
    "PROFILE_DATA.aboutPhotos minimal berisi 2 slot foto"
  );

  const assetPaths = [
    PROFILE_DATA.photoUrl,
    ...PROFILE_DATA.aboutPhotos.map((photo) => photo.src),
    PROFILE_DATA.cvUrl,
    ...CERTIFICATES.map((cert) => cert.imageUrl)
  ];

  for (const assetPath of assetPaths) {
    assert.ok(
      typeof assetPath === "string" && assetPath.startsWith("/"),
      `Path aset harus diawali '/': ${assetPath}`
    );
    const diskPath = path.join(ROOT, "public", assetPath.slice(1));
    assert.ok(fs.existsSync(diskPath), `Aset publik tidak ditemukan: ${diskPath}`);
    assert.ok(fs.statSync(diskPath).size > 0, `Aset publik kosong: ${diskPath}`);
  }
});

test("tidak ada karakter em-dash (U+2014) pada kode sumber dan aset teks", () => {
  const filesToScan = [
    path.join(ROOT, "next.config.mjs"),
    path.join(ROOT, "public/llms.txt"),
    ...listFilesRecursive(path.join(ROOT, "src")),
    ...listFilesRecursive(path.join(ROOT, "public/images")).filter((filePath) =>
      filePath.endsWith(".svg")
    )
  ];

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, "utf8");
    assert.ok(
      !content.includes("\u2014"),
      `Karakter em-dash ditemukan di ${path.relative(ROOT, filePath)}`
    );
  }
});

test("tidak ada tautan kosong href='#' atau data perjalanan kosong", () => {
  const urls = [
    PROFILE_DATA.siteUrl,
    PROFILE_DATA.githubUrl,
    ...FEATURED_PROJECTS.flatMap((p) => [p.repoUrl, p.mobileRepoUrl, p.liveUrl].filter(Boolean)),
    ...ARCHIVE_PROJECTS.flatMap((p) => [p.repoUrl, p.liveUrl].filter(Boolean))
  ];

  for (const url of urls) {
    assert.notEqual(url.trim(), "#", "Tautan tidak boleh placeholder '#'");
    assert.ok(url.startsWith("https://"), `URL harus https: ${url}`);
  }

  assert.ok(JOURNEY_CHAPTERS.length >= 3, "JOURNEY_CHAPTERS minimal 3 bab");
});

test("tidak ada sisa impor section usang dan seluruh gambar & header keamanan terpasang", () => {
  const deprecatedTokens = [
    "ServicesSection",
    "WorkflowSection",
    "CustomCursor",
    "KineticMarquee",
    "#services",
    "#workflow"
  ];
  const srcFiles = listFilesRecursive(path.join(ROOT, "src"));

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    for (const token of deprecatedTokens) {
      assert.ok(
        !content.includes(token),
        `Referensi usang "${token}" masih ada di ${path.relative(ROOT, filePath)}`
      );
    }

    const imageMatches = [...content.matchAll(/<Image[\s\S]*?\/>/g)];
    for (const match of imageMatches) {
      assert.ok(
        match[0].includes("sizes="),
        `Komponen <Image> di ${path.relative(ROOT, filePath)} wajib mencantumkan prop sizes`
      );
    }
  }

  const nextConfigSource = fs.readFileSync(path.join(ROOT, "next.config.mjs"), "utf8");
  for (const headerName of ["X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy"]) {
    assert.ok(
      nextConfigSource.includes(headerName),
      `Header keamanan ${headerName} belum diatur di next.config.mjs`
    );
  }

  for (const requiredFile of [
    "src/app/not-found.js",
    "src/app/manifest.js",
    "src/app/apple-icon.js",
    "src/app/api/github-contributions/route.js",
    ".github/workflows/ci.yml"
  ]) {
    assert.ok(
      fs.existsSync(path.join(ROOT, requiredFile)),
      `File wajib ${requiredFile} belum ada`
    );
  }
});

test("parseGithubContributionsHtml dan GraphQL normalizer mengurai kalender kontribusi dengan tepat", () => {
  const sampleHtml = `
    <h2 id="js-contribution-activity-description" class="f4 text-normal mb-2">
      131 contributions in the last year
    </h2>
    <table>
      <tbody>
        <tr>
          <td id="c-0" data-date="2026-11-08" data-level="0" class="ContributionCalendar-day"></td>
          <td data-level="2" id="c-1" data-date="2026-11-09" class="ContributionCalendar-day"></td>
          <td id="c-2" data-date="2026-11-14" data-level="4" class="ContributionCalendar-day"></td>
        </tr>
      </tbody>
    </table>
    <tool-tip for="c-0">No contributions on November 8th.</tool-tip>
    <tool-tip data-type="label" for="c-1">1 contribution on November 9th.</tool-tip>
    <tool-tip for="c-2">7 contributions on November 14th.</tool-tip>
  `;

  const parsed = parseGithubContributionsHtml(sampleHtml);
  assert.ok(parsed, "HTML valid harus menghasilkan objek kalender");
  assert.equal(parsed.source, "github-html");
  assert.equal(parsed.totalContributions, 131);
  assert.equal(parsed.rangeStart, "2026-11-08");
  assert.equal(parsed.rangeEnd, "2026-11-14");
  assert.equal(parsed.weeks.length, 1);
  assert.equal(parsed.weeks[0].length, 7);
  assert.deepEqual(parsed.weeks[0][0], { date: "2026-11-08", count: 0, level: 0 });
  assert.deepEqual(parsed.weeks[0][1], { date: "2026-11-09", count: 1, level: 2 });
  assert.equal(parsed.weeks[0][2], null);
  assert.deepEqual(parsed.weeks[0][6], { date: "2026-11-14", count: 7, level: 4 });

  assert.equal(parseGithubContributionsHtml(""), null);
  assert.equal(parseGithubContributionsHtml("<div>kosong</div>"), null);

  const gqlParsed = parseGithubGraphqlCalendar({
    totalContributions: 12,
    weeks: [
      {
        contributionDays: [
          {
            date: "2026-11-14",
            contributionCount: 12,
            contributionLevel: "FOURTH_QUARTILE"
          }
        ]
      }
    ]
  });
  assert.ok(gqlParsed);
  assert.equal(gqlParsed.source, "github-graphql");
  assert.equal(gqlParsed.totalContributions, 12);
  assert.deepEqual(gqlParsed.weeks[0][6], { date: "2026-11-14", count: 12, level: 4 });
});
