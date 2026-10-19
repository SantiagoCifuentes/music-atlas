import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  assertLocalResetAllowed,
  assertTestDatabaseUrl,
  loadDatabaseEnvironment,
  requireTestDatabaseUrl,
} from "./environment.js";

const originalNodeEnv = process.env.NODE_ENV;
const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalNodeEnv;
  if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

describe("database environment safeguards", () => {
  it("accepts a dedicated test database", () => {
    expect(() =>
      assertTestDatabaseUrl(
        "postgresql://music_atlas:music_atlas@localhost:5433/music_atlas_test",
      ),
    ).not.toThrow();
  });

  it("rejects the development database for test operations", () => {
    expect(() =>
      assertTestDatabaseUrl(
        "postgresql://music_atlas:music_atlas@localhost:5433/music_atlas",
      ),
    ).toThrow("Expected the local music_atlas_test database");
  });

  it("rejects an unexpected test database", () => {
    expect(() =>
      assertTestDatabaseUrl(
        "postgresql://music_atlas:music_atlas@localhost:5433/other_test",
      ),
    ).toThrow("Expected the local music_atlas_test database");
  });

  it("loads test configuration over a conflicting development variable", () => {
    const directory = mkdtempSync(join(tmpdir(), "music-atlas-env-"));
    writeFileSync(
      join(directory, ".env.test"),
      "DATABASE_URL=postgresql://music_atlas:music_atlas@localhost:5433/music_atlas_test\n",
    );

    try {
      process.env.NODE_ENV = "test";
      process.env.DATABASE_URL =
        "postgresql://music_atlas:music_atlas@localhost:5433/music_atlas";
      loadDatabaseEnvironment(directory);

      expect(requireTestDatabaseUrl()).toContain("/music_atlas_test");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("fails clearly when test configuration is missing", () => {
    const directory = mkdtempSync(join(tmpdir(), "music-atlas-env-"));

    try {
      process.env.NODE_ENV = "test";
      process.env.DATABASE_URL =
        "postgresql://music_atlas:music_atlas@localhost:5433/music_atlas";

      expect(() => loadDatabaseEnvironment(directory)).toThrow(
        "Missing .env.test",
      );
      expect(() => requireTestDatabaseUrl()).toThrow("Missing DATABASE_URL");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("requires explicit permission before local reset", () => {
    const previousValue = process.env.ALLOW_DATABASE_RESET;
    delete process.env.ALLOW_DATABASE_RESET;

    expect(() =>
      assertLocalResetAllowed(
        "postgresql://music_atlas:music_atlas@localhost:5433/music_atlas",
      ),
    ).toThrow("ALLOW_DATABASE_RESET=true");

    if (previousValue === undefined) {
      delete process.env.ALLOW_DATABASE_RESET;
    } else {
      process.env.ALLOW_DATABASE_RESET = previousValue;
    }
  });
});
