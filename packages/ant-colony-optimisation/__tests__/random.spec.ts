import { chanceRandomFactory } from "../src/random";

describe("when generating randomness with chanceRandom", () => {
  it("should support getRandomNumber", () => {
    const result = chanceRandomFactory(["A", "B", "C"]).getRandomNumber(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("should support getRandomGraphIndex", () => {
    const result = chanceRandomFactory(["A", "B", "C"]).getRandomGraphIndex();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
  });
});
