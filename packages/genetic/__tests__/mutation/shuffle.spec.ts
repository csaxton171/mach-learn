import { shuffleMutationFactory, chanceRandomIndex } from "../../src/mutation";
import { ScorablePhenome } from "../../src/Phenome";

describe("shuffle", () => {
  it("should swap values using random selection within array", () => {
    const sut = shuffleMutationFactory(
      1,
      jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(3)
    );
    expect(sut(new ScorablePhenome([1, 2, 3, 4]))).toMatchObject({
      value: [1, 4, 3, 2],
    });
  });

  it("should swap dcxexvalues using random selection within array", () => {
    const spyRandomIndex = jest.fn(chanceRandomIndex);
    const sut = shuffleMutationFactory(5, spyRandomIndex);

    sut(new ScorablePhenome([1, 2, 3, 4]));

    expect(spyRandomIndex.mock.calls.length).toBeGreaterThanOrEqual(10);
  });

  it("should throw an exception if Phenome value is not an array", () => {
    const sut = shuffleMutationFactory(1, jest.fn());
    expect(() => sut(new ScorablePhenome("ka-boom"))).toThrowError(
      /must be an array/
    );
  });

  it("should throw an exception if the value has less than 2 elements", () => {
    const sut = shuffleMutationFactory(1, jest.fn());
    expect(() => sut(new ScorablePhenome([1]))).toThrowError(
      /must have at least 2 elements/
    );
  });
});
