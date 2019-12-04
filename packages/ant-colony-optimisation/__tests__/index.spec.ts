import { iterate, calculateProbability, calculateNextMove } from "../src";
import { defaultConfig } from "../src/config";
import { alphaDistanceScore, alphaOrderRankScore } from "../src/scoring";
import { Ant } from "../src/Ant";
import { initialisePheromoneMatrix } from "../src/pheromonMatrix";

const createRandom = () => ({
  getRandomNumber: jest.fn(),
  getRandomGraphIndex: jest.fn()
});

describe("when performing ACO", () => {
  describe("when calculating the probability of a next move", () => {
    it("should moo", () => {
      const ant = new Ant([0, 1, 2, 3]);
      const graph = ["A", "B", "C", "D", "E", "F"];
      const pheromoneMatrix = initialisePheromoneMatrix(
        graph.length,
        defaultConfig.initialPheromone
      );

      expect(
        calculateProbability<string>(
          defaultConfig,
          pheromoneMatrix,
          graph,
          alphaDistanceScore
        )(ant)
      ).toEqual([0, 0, 0, 0, 0.5529996700457747, 0.5770431339608083]);
    });
  });

  describe("when determining the next move for an ant", () => {
    describe("and the ant has not moved yet", () => {
      it("should randomly select an available graph element", () => {
        const ant = new Ant();
        const graph = ["A", "C", "B"];
        const mockRandom = createRandom();
        mockRandom.getRandomGraphIndex.mockReturnValueOnce(2);

        const result = calculateNextMove<string>(
          defaultConfig,
          graph,
          mockRandom,
          jest.fn()
        )(ant);
        expect(result).toBe(2);
      });
    });

    describe("and the ant has previously moved", () => {
      it("should occassionaly randomly select an available graph element", () => {
        const ant = new Ant([0]);
        const graph = ["A", "C", "B"];
        const mockRandom = createRandom();
        mockRandom.getRandomNumber.mockReturnValueOnce(defaultConfig.pr / 2);
        mockRandom.getRandomGraphIndex.mockReturnValueOnce(2);

        const result = calculateNextMove<string>(
          defaultConfig,
          graph,
          mockRandom,
          jest.fn()
        )(ant);
        expect(result).toBe(2);
      });

      it("should normally, select the most likely available graph element", () => {
        const ant = new Ant([0]);
        const graph = ["A", "C", "B"];
        const mockRandom = createRandom();
        mockRandom.getRandomNumber
          .mockReturnValueOnce(defaultConfig.pr + 0.02)
          .mockReturnValueOnce(0.4);
        const mockMoveProbabilityCalculator = jest
          .fn()
          .mockReturnValue([0.0, 0.9, 0.03]);

        const result = calculateNextMove<string>(
          defaultConfig,
          graph,
          mockRandom,
          mockMoveProbabilityCalculator
        )(ant);
        expect(result).toBe(1);
      });
    });
  });

  describe("when iterating for a solution", () => {
    it.only("should do the things", () => {
      const graph = ["E", "A", "D", "B", "F", "C"];
      //              1, 3, 0, 2
      let lastSolution;
      for (lastSolution of iterate(
        { ...defaultConfig, antCount: 1 },
        graph,
        alphaOrderRankScore,
        10
      )) {
        // console.log(">>>", lastSolution);
      }
      // expect(lastSolution).toEqual(["A", "B", "C"]);
    }, 20000);
  });
});
