import { truncationFactory } from "../../src/selection";
import { range } from "ramda";

describe("truncationFactory", () => {
  const population: number[] = range(1, 101);
  const selector = truncationFactory<number>(0.25);
  let result: number[];

  beforeAll(() => {
    result = selector(population);
  });

  it("should yield a single population member", () =>
    expect(result.length).toBe(1));

  it("should select a member from the specified subset of population", () => {
    expect(result[0]).toBeGreaterThanOrEqual(1);
    expect(result[0]).toBeLessThanOrEqual(100);
  });

  it("should throw an exception if configured with too large a breeding ration", () => {
    expect(() => truncationFactory<number>(1.02)).toThrow();
  });
});
