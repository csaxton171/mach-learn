import {
  fitnessProportionateFactory,
  ScoringFunction,
} from "../../src/selection";
import { ScorablePhenome, Phenome } from "../../src/Phenome";

describe("fitnessProportionate", () => {
  const scoreByScoreProp: ScoringFunction = (subject: Phenome) =>
    (subject as ScorablePhenome).score;

  it("should return phenome based on phenome score proportion of total", async () => {
    const expected = new ScorablePhenome([0]).withScore(20);

    const sut = fitnessProportionateFactory(
      scoreByScoreProp,
      jest.fn().mockReturnValue(0.4)
    );
    const population = [
      new ScorablePhenome([0]).withScore(10),
      expected,
      new ScorablePhenome([0]).withScore(40),
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

      return expect(
        sut([new ScorablePhenome([0]).withScore(10)])
      ).rejects.toThrowError(/must return a value between 0 and 1 inclusive/);
    });
    it("should throw an exception if returning value below 0", () => {
      const sut = fitnessProportionateFactory(
        scoreByScoreProp,
        jest.fn().mockReturnValue(-0.01)
      );

      return expect(
        sut([new ScorablePhenome([0]).withScore(10)])
      ).rejects.toThrowError(/must return a value between 0 and 1 inclusive/);
    });
  });
});
