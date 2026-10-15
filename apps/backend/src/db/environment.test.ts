import { describe, expect, it } from "vitest";
import {
  assertLocalResetAllowed,
  assertTestDatabaseUrl,
} from "./environment.js";

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
    ).toThrow("must end with '_test'");
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
