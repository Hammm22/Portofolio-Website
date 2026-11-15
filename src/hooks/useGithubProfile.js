"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PROFILE_DATA } from "@/data/profileData";

const GITHUB_CACHE_KEY = "hammm22_github_profile_v1";
const GITHUB_CACHE_TTL_MS = 30 * 60 * 1000;

function readGithubCache() {
  try {
    const raw = window.localStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed.fetchedAt !== "number" ||
      !parsed.data ||
      Date.now() - parsed.fetchedAt > GITHUB_CACHE_TTL_MS
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeGithubCache(payload) {
  try {
    window.localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Abaikan jika penyimpanan browser dibatasi (mis. mode privat)
  }
}

/**
 * Mengelola pengambilan statistik profil GitHub beserta cache lokal 30 menit dan data cadangan.
 */
export function useGithubProfile() {
  const abortRef = useRef(null);
  const [githubState, setGithubState] = useState({
    status: "loading",
    updatedAt: null,
    error: null,
    data: PROFILE_DATA.fallbackGithubStats
  });

  const loadGithubStats = useCallback(async (signal, bypassCache = false) => {
    if (!bypassCache) {
      const cached = readGithubCache();
      if (cached) {
        return {
          status: "success",
          updatedAt: cached.updatedAt || null,
          error: null,
          data: cached.data
        };
      }
    }

    try {
      const response = await fetch(PROFILE_DATA.githubApiUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        },
        ...(bypassCache ? { cache: "no-store" } : {}),
        signal
      });

      if (!response.ok) {
        throw new Error(`Status HTTP ${response.status}`);
      }

      const json = await response.json();
      const updatedAt = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());

      const nextData = {
        public_repos:
          typeof json.public_repos === "number"
            ? json.public_repos
            : PROFILE_DATA.fallbackGithubStats.public_repos,
        followers:
          typeof json.followers === "number"
            ? json.followers
            : PROFILE_DATA.fallbackGithubStats.followers,
        following:
          typeof json.following === "number"
            ? json.following
            : PROFILE_DATA.fallbackGithubStats.following,
        login: json.login || PROFILE_DATA.handle,
        html_url: json.html_url || PROFILE_DATA.githubUrl,
        bio: json.bio || PROFILE_DATA.fallbackGithubStats.bio
      };

      writeGithubCache({
        fetchedAt: Date.now(),
        updatedAt,
        data: nextData
      });

      return {
        status: "success",
        updatedAt,
        error: null,
        data: nextData
      };
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return null;
      }
      return {
        status: "error",
        updatedAt: null,
        error: err instanceof Error ? err.message : "Kendala jaringan",
        data: PROFILE_DATA.fallbackGithubStats
      };
    }
  }, []);

  const refreshGithubProfile = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setGithubState((prev) => ({
      ...prev,
      status: "loading",
      error: null
    }));

    const nextState = await loadGithubStats(controller.signal, true);
    if (nextState && !controller.signal.aborted) {
      setGithubState(nextState);
    }
  }, [loadGithubStats]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    loadGithubStats(controller.signal).then((nextState) => {
      if (nextState && !controller.signal.aborted) {
        setGithubState(nextState);
      }
    });

    return () => {
      abortRef.current?.abort();
    };
  }, [loadGithubStats]);

  return {
    githubState,
    stats: githubState.data,
    refreshGithubProfile
  };
}
