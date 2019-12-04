import { alphaDistanceScore } from "../src/scoring";

describe("when scoring alphabetical sequences using alphaDistanceScore", () => {
  it.each`
    graph              | score
    ${["A", "B"]}      | ${1}
    ${["B", "C"]}      | ${1}
    ${["H", "I", "J"]} | ${1}
  `(
    "should yield perfect score for contiguous sequences $graph",
    ({ graph, score }) => {
      expect(alphaDistanceScore(graph)).toEqual(score);
    }
  );
});

// describe("when scoring for alphabetical order", () => {
//   it("alphabetically order set should have perfect score", () => {
//     expect(alphaOrderScore(["a", "b", "c"])).toEqual(1);
//   });
//   it("non-alphabetically order set should not have perfect score", () => {
//     expect(alphaOrderScore(["b", "a", "c"])).toBeLessThan(1);
//   });
//   it.each`
//     graph         | score
//     ${["a", "b"]} | ${0.5}
//     ${["b", "a"]} | ${0.6666666666666666}
//   `("$graph should score $score", ({ graph, score }) => {
//     expect(alphaOrderScore(graph)).toEqual(score);
//   });
// });
