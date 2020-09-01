import { tournamentFactory } from "../../src/selection";
import { Phenome } from "../../src/Phenome";

describe("tournamentFactory", () => {
  it("should yield a single population member", async () => {
    const mockContestFn = jest.fn().mockReturnValue(1);
    const sut = tournamentFactory(6, mockContestFn);

    const expected = await sut([
      new Phenome([1]),
      new Phenome([2]),
      new Phenome([3]),
    ]);

    expect(expected).toHaveLength(1);
  });

  it("should execute the specified number of rounds", async () => {
    const expectedRounds = 4;
    const mockContestFn = jest.fn().mockReturnValue(1);
    const sut = tournamentFactory(expectedRounds, mockContestFn);

    await sut([new Phenome([1]), new Phenome([1])]);

    expect(mockContestFn).toBeCalledTimes(expectedRounds);
  });

  it("should return the winning population member", async () => {
    const expectedChampion = new Phenome([1]);
    const mockContestFn = jest.fn().mockReturnValue(expectedChampion);
    const sut = tournamentFactory(5, mockContestFn);

    const result = await sut([
      new Phenome([1]),
      new Phenome([1]),
      new Phenome([1]),
      expectedChampion,
    ]);

    expect(result).toMatchObject([expectedChampion]);
  });
});
