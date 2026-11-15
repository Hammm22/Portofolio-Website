import { NextResponse } from "next/server";
import { PROFILE_DATA } from "@/data/profileData";
import {
  parseGithubContributionsHtml,
  parseGithubGraphqlCalendar
} from "@/lib/githubContributions";

const GITHUB_GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function fetchViaGraphql(handle, token, fetchOptions) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portofolio-website"
    },
    body: JSON.stringify({
      query: GITHUB_GRAPHQL_QUERY,
      variables: { login: handle }
    }),
    signal: AbortSignal.timeout(8000),
    ...fetchOptions
  });

  if (!response.ok) {
    throw new Error(`GraphQL HTTP ${response.status}`);
  }

  const json = await response.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  return parseGithubGraphqlCalendar(calendar);
}

async function fetchViaPublicHtml(handle, fetchOptions) {
  const response = await fetch(
    `https://github.com/users/${encodeURIComponent(handle)}/contributions`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": "portofolio-website"
      },
      signal: AbortSignal.timeout(8000),
      ...fetchOptions
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub HTML HTTP ${response.status}`);
  }

  const html = await response.text();
  return parseGithubContributionsHtml(html);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bypassCache = searchParams.get("refresh") === "1";
  const fetchOptions = bypassCache
    ? { cache: "no-store" }
    : { next: { revalidate: 1800 } };

  const handle = PROFILE_DATA.handle;
  const token = process.env.GITHUB_TOKEN;

  let payload = null;
  let lastError = null;

  if (token) {
    try {
      payload = await fetchViaGraphql(handle, token, fetchOptions);
    } catch (err) {
      lastError = err instanceof Error ? err.message : "GraphQL gagal";
    }
  }

  if (!payload) {
    try {
      payload = await fetchViaPublicHtml(handle, fetchOptions);
    } catch (err) {
      lastError = err instanceof Error ? err.message : "GitHub tidak dapat diakses";
    }
  }

  if (!payload) {
    return NextResponse.json(
      {
        error: lastError || "Data kontribusi GitHub belum tersedia"
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": bypassCache
        ? "no-store"
        : "public, s-maxage=1800, stale-while-revalidate=86400"
    }
  });
}
