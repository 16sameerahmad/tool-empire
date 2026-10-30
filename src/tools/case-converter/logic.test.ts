import { describe, it, expect } from "vitest";
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toTitleCase,
  toConstantCase,
} from "./logic";

describe("Case Converter Logic", () => {
  const sample = "hello world_test-example";

  it("converts strings correctly to camelCase and PascalCase", () => {
    expect(toCamelCase(sample)).toBe("helloWorldTestExample");
    expect(toPascalCase(sample)).toBe("HelloWorldTestExample");
  });

  it("converts strings correctly to snake_case and kebab-case", () => {
    expect(toSnakeCase(sample)).toBe("hello_world_test_example");
    expect(toKebabCase(sample)).toBe("hello-world-test-example");
  });

  it("converts strings correctly to title case and CONSTANT_CASE", () => {
    expect(toTitleCase("the quick brown fox")).toBe("The Quick Brown Fox");
    expect(toConstantCase(sample)).toBe("HELLO_WORLD_TEST_EXAMPLE");
  });
});
