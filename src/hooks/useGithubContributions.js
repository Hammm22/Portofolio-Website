"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const CONTRIB_CACHE_KEY = "hammm22_github_contributions_v1";
const CONTRIB_CACHE_TTL_MS = 30 * 60 * 1000;

function readContributionCache() {
  try {
    const raw = window.localStorage.getItem(CONTRIB_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed.fetchedAt !== "number" ||
      !parsed.data ||
      !Array.isArray(parsed.data.weeks) ||
      Date.now() - parsed.fetchedAt > CONTRIB_CACHE_TTL_MS
    ) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeContributionCache(data) {
  try {
    window.localStorage.setItem(
      CONTRIB_CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), data })
    );
  } catch {
    // Abaikan jika penyimpanan browser dibatasi (mis. mode privat)
  }
}

/**
 * Mengelola pengambilan kalender kontribusi GitHub 52 minggu beserta cache lokal 30 menit.
 */
export function useGithubContributions() {
  const abortRef = useRef(null);
  const [state, setState] = useState({
    status: "loading",
    isRefreshing: false,
    data: null,
    error: null
  });

  const loadContributions = useCallback(async (signal, bypassCache = false) => {
    if (!bypassCache) {
      const cached = readContributionCache();
      if (cached) {
        return {
          status: cached.weeks.length > 0 ? "ready" : "empty",
          isRefreshing: false,
          data: cached.weeks.length > 0 ? cached : null,
          error: null
        };
      }
    }

    try {
      const endpoint = bypassCache
        ? "/api/github-contributions?refresh=1"
        : "/api/github-contributions";
      const response = await fetch(endpoint, {
        ...(bypassCache ? { cache: "no-store" } : {}),
        signal
      });

      const json = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(json?.error || `Status HTTP ${response.status}`);
      }

      if (!json || !Array.isArray(json.weeks) || json.weeks.length === 0) {
        return {
          status: "empty",
          isRefreshing: false,
          data: null,
          error: null
        };
      }

      writeContributionCache(json);

      return {
        status: "ready",
        isRefreshing: false,
        data: json,
        error: null
      };
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return null;
      }
      return {
        status: "error",
        isRefreshing: false,
        data: null,
        error: err instanceof Error ? err.message : "Kendala jaringan"
      };
    }
  }, []);

  const refreshContributions = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({
      ...prev,
      status: prev.data ? prev.status : "loading",
      isRefreshing: true,
      error: null
    }));

    const nextState = await loadContributions(controller.signal, true);
    if (nextState && !controller.signal.aborted) {
      setState(nextState);
    }
  }, [loadContributions]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    loadContributions(controller.signal).then((nextState) => {
      if (nextState && !controller.signal.aborted) {
        setState(nextState);
      }
    });

    return () => {
      abortRef.current?.abort();
    };
  }, [loadContributions]);

  return {
    contribStatus: state.status,
    isContribRefreshing: state.isRefreshing,
    contribData: state.data,
    contribError: state.error,
    refreshContributions
  };
}
