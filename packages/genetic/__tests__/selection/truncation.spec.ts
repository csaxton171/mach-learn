import { truncationFactory } from "../../src/selection";
import { range } from "ramda";
import { SelectionFunction } from "../../src/selection";
import { Phenome, ScorablePhenome } from "../../src/Phenome";

describe("truncationFactory", () => {
  const population: Phenome<number>[] = range(1, 101).map(
    (v) => new ScorablePhenome([v])
  );
  const selector: SelectionFunction = truncationFactory(0.25);
  let result: Phenome<number>[];

  beforeAll(async () => {
    result = await selector(population);
  });

  it("should yield a single population member", () =>
    expect(result.length).toBe(1));

  it("should select a member from the specified subset of population", () => {
    expect(result[0].value[0]).toBeGreaterThanOrEqual(1);
    expect(result[0].value[0]).toBeLessThanOrEqual(100);
  });

  it("should throw an exception if configured with too large a breeding ration", () => {
    expect(() => truncationFactory(1.02)).toThrow();
  });
});
