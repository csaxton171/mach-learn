import { truncationFactory } from "../../src/selection";
import { range } from "ramda";
import { SelectionFunction } from "../../src/selection";
import { Phenome } from "../../src/Phenome";

describe("truncationFactory", () => {
  const population: Phenome[] = Phenome.from(range(1, 101));
  const selector: SelectionFunction = truncationFactory(0.25);
  let result: Phenome[];

  beforeAll(async () => {
    result = await selector(population);
  });

  it("should yield a single population member", () =>
    expect(result.length).toBe(1));

  it("should select a member from the specified subset of population", () => {
    expect(result[0].value).toBeGreaterThanOrEqual(1);
    expect(result[0].value).toBeLessThanOrEqual(100);
  });

  it("should throw an exception if configured with too large a breeding ration", () => {
    expect(() => truncationFactory(1.02)).toThrow();
  });
});
