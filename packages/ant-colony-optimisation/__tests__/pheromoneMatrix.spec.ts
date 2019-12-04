import { defaultConfig } from "../src/config";
import { ScoringFunction } from "../src/scoring";
import {
  initialisePheromoneMatrix,
  evaporatePheromoneMatrix,
  updatePheromoneMatrix
} from "../src/pheromonMatrix";
import { Ant } from "../src/Ant";

describe("when updating the pheromone matrix", () => {
  it("should do update the pheromone matrix", () => {
    const graph = ["a", "b", "c"];
    const ants = [new Ant([1, 0, 2])];
    const score: ScoringFunction<string> = jest
      .fn()
      .mockReturnValueOnce(0.32)
      .mockReturnValueOnce(1);
    const pheromones = initialisePheromoneMatrix(3, 0);
    expect(
      updatePheromoneMatrix<string>(
        defaultConfig,
        score,
        pheromones,
        graph,
        ants
      )
    ).toMatchObject([
      [0, 0, 1562.5],
      [1562.5, 0, 0],
      [0, 0, 0]
    ]);
  });
});

describe("when evaporating a pheromone matrix", () => {
  it("should apply evaporation amount to each pheromone point", () => {
    const matrix = initialisePheromoneMatrix(2, 6);
    expect(
      evaporatePheromoneMatrix({ ...defaultConfig, evaporation: 0.5 }, matrix)
    ).toMatchObject([
      [3, 3],
      [3, 3]
    ]);
  });
});

describe("when initialising the pheromone grid", () => {
  it("should produce a 2 dimensional square grid of size specified", () => {
    const result = initialisePheromoneMatrix(3, 0);

    expect(result.length).toBe(3);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(3);
    expect(result[2].length).toBe(3);
  });
  it("should set each node to the initial pheromone value", () => {
    const result = initialisePheromoneMatrix(3, 1.2);
    expect(result).toEqual([
      [1.2, 1.2, 1.2],
      [1.2, 1.2, 1.2],
      [1.2, 1.2, 1.2]
    ]);
  });
});
