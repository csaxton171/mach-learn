import { tournamentFactory } from "../../src/selection";
import { Phenome } from "../../src/Phenome";

describe("tournamentFactory", () => {
  it("should yield a single population member", async () => {
    const mockContestFn = jest.fn().mockReturnValue(1);
    const expected = await tournamentFactory(
      6,
      mockContestFn
    )(Phenome.from([1, 2, 3, 4, 5, 6]));

    expect(expected).toHaveLength(1);
  });

  it("should execute the specified number of rounds", async () => {
    const expectedRounds = 4;
    const mockContestFn = jest.fn().mockReturnValue(1);
    const sut = tournamentFactory(expectedRounds, mockContestFn);

    await sut(Phenome.from([1, 2, 3, 4, 5, 6]));

    expect(mockContestFn).toBeCalledTimes(expectedRounds);
  });

  it("should return the winning population member", async () => {
    const expectedChampion = new Phenome(22);
    const mockContestFn = jest.fn().mockReturnValue(expectedChampion);
    const sut = tournamentFactory(5, mockContestFn);

    const result = await sut(Phenome.from([1, 22, 99]));

    expect(result).toMatchObject([expectedChampion]);
  });
});
