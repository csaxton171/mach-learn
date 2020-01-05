import { alphaDistanceCost, alphaOrderRankCost } from "../src/scoring";

describe("when scoring alphabetical sequences using alphaDistanceCost", () => {
  it.each`
    graph              | score
    ${["A", "B"]}      | ${0}
    ${["B", "C"]}      | ${0}
    ${["H", "I", "J"]} | ${0}
  `(
    "should yield perfect score for contiguous sequences $graph",
    ({ graph, score }) => {
      expect(alphaDistanceCost(graph)).toEqual(score);
    }
  );
});
describe("when scoring alphabetical sequences using alphaOrderRankCost", () => {
  it.each`
    graph              | score
    ${["A", "B"]}      | ${0}
    ${["B", "C"]}      | ${0}
    ${["H", "I", "J"]} | ${0}
  `(
    "should yield perfect score for contiguous sequences $graph",
    ({ graph, score }) => {
      expect(alphaOrderRankCost(graph)).toEqual(score);
    }
  );
});
