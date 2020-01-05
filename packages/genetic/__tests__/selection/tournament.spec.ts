import { tournamentFactory } from "../../src/selection";

describe("tournamentFactory", () => {
  it("should execute the specified number of rounds", () => {
    const expectedRounds = 4;
    const mockContestFn = jest.fn().mockReturnValue(1);
    const sut = tournamentFactory(expectedRounds, mockContestFn);

    sut([1, 2, 3, 4, 5, 6]);

    expect(mockContestFn).toBeCalledTimes(expectedRounds);
  });

  it("should return the winning population member", () => {
    const expectedChampion = 22;
    const mockContestFn = jest.fn().mockReturnValue(expectedChampion);
    const sut = tournamentFactory(5, mockContestFn);

    const result = sut([1, 22, 99]);

    expect(result).toMatchObject([expectedChampion]);
  });
});
