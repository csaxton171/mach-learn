import { fitnessProportionateFactory } from "../../src/selection";
import { Phenome } from "../../src/Phenome";
import { ScoringFunction } from "../../src/ScoringFunction";

describe("fitnessProportionate", () => {
  const scoreByScoreProp: ScoringFunction = (subject: Phenome) =>
    (subject as Phenome).score;

  it("should return phenome based on phenome score proportion of total", async () => {
    const expected = new Phenome([0]).withScore(20);

    const sut = fitnessProportionateFactory(
      scoreByScoreProp,
      jest.fn().mockReturnValue(0.4)
    );
    const population = [
      new Phenome([0]).withScore(10),
      expected,
      new Phenome([0]).withScore(40),
    ];

    const result = await sut(population);
    expect(result).toMatchObject([expected]);
  });

  describe("when supplied random percentage function returns in valid value", () => {
    it("should throw an exception if returning value above 1", () => {
      const sut = fitnessProportionateFactory(
        scoreByScoreProp,
        jest.fn().mockReturnValue(1.01)
      );

      return expect(sut([new Phenome([0]).withScore(10)])).rejects.toThrowError(
        /must return a value between 0 and 1 inclusive/
      );
    });
    it("should throw an exception if returning value below 0", () => {
      const sut = fitnessProportionateFactory(
        scoreByScoreProp,
        jest.fn().mockReturnValue(-0.01)
      );

      return expect(sut([new Phenome([0]).withScore(10)])).rejects.toThrowError(
        /must return a value between 0 and 1 inclusive/
      );
    });
  });
});
