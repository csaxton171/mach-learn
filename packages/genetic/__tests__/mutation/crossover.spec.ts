import { crossoverMutationFactory } from "../../src/mutation";
import { Phenome } from "../../src/Phenome";
import { chanceRandomNatural } from "../../src/randomisation";
import { range, uniq } from "ramda";

describe("mutation", () => {
  describe("crossover", () => {
    it("should produce 2 Phenomes spliced and crossed over according to specified cut length", () => {
      const sut = crossoverMutationFactory(2, jest.fn().mockReturnValue(3));

      const parent1 = new Phenome([1, 2, 3, 4, 5, 6, 7, 8]);
      const parent2 = new Phenome(
        parent1.value.map((v) => (v as number) * 100)
      );

      const result = sut(parent1, parent2);

      expect(result).toMatchObject([
        new Phenome([1, 2, 3, 400, 500, 6, 7, 8]),
        new Phenome([100, 200, 300, 4, 5, 600, 700, 800]),
      ]);
    });
    it("should produce phenomes with each containing no duplicate value", () => {
      const sut = crossoverMutationFactory(2, jest.fn().mockReturnValue(3));

      const parent1 = new Phenome(range(1, 10));

      const [r1, r2] = sut(parent1, new Phenome(parent1.value.reverse()));

      expect(r1.value.length).toEqual(uniq(r1.value).length);
      expect(r2.value.length).toEqual(uniq(r2.value).length);
    });

    it("should not randomly select a cutpoint that would exceed the value bounds", () => {
      const mockRandom = jest.fn(chanceRandomNatural);
      const sut = crossoverMutationFactory(2, mockRandom);

      sut(new Phenome([1, 2, 3, 4, 5]), new Phenome([10, 20, 30, 40, 50]));

      expect(mockRandom).toHaveBeenCalledWith(0, 3);
    });

    it("should throw an exception if given an invalid cut length", () => {
      const parent1 = new Phenome([]);
      const parent2 = new Phenome([]);

      const sut = crossoverMutationFactory(0, jest.fn());

      expect(() => sut(parent1, parent2)).toThrowError(
        /must be greater than zero/
      );
    });
  });
});
