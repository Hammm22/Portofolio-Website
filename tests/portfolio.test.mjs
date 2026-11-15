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

test("semua ikon SKILL_GROUPS terpetakan di AboutSection.jsx dan tersedia di Phosphor", () => {
  const aboutSource = fs.readFileSync(
    path.join(ROOT, "src/components/sections/AboutSection.jsx"),
    "utf8"
  );
  const blockMatch = aboutSource.match(/const SKILL_ICONS\s*=\s*\{([\s\S]*?)\};/);
  assert.ok(blockMatch, "Blok SKILL_ICONS harus ada di AboutSection.jsx");

  const mappedIcons = new Set(
    blockMatch[1]
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean)
  );

  const csrDir = path.join(ROOT, "node_modules/@phosphor-icons/react/dist/csr");
  const hasNodeModules = fs.existsSync(csrDir);

  assert.ok(SKILL_GROUPS.length > 0, "SKILL_GROUPS tidak boleh kosong");
  for (const group of SKILL_GROUPS) {
    assert.ok(group.items.length > 0, `Grup ${group.id} tidak boleh kosong`);
    for (const skill of group.items) {
      assert.ok(skill.id && skill.label && skill.fullLabel, "Properti skill tidak lengkap");
      assert.ok(
        mappedIcons.has(skill.icon),
        `Ikon "${skill.icon}" untuk "${skill.label}" belum didaftarkan di SKILL_ICONS`
      );
      if (hasNodeModules) {
        assert.ok(
          fs.existsSync(path.join(csrDir, `${skill.icon}.d.ts`)),
          `Ekspor @phosphor-icons/react untuk "${skill.icon}" tidak ditemukan`
        );
      }
    }
  }
});

test("aset lokal di folder public tersedia untuk profil, CV, dan sertifikat", () => {
  const assetPaths = [
    PROFILE_DATA.photoUrl,
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
    ...listFilesRecursive(path.join(ROOT, "public/images"))
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

test("tidak ada sisa impor komponen dan tautan section yang sudah dihapus", () => {
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
  }

  assert.ok(
    fs.existsSync(path.join(ROOT, "src/app/not-found.js")),
    "Halaman 404 kustom src/app/not-found.js harus ada"
  );
});
