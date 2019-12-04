import { Ant } from "../src/Ant";

describe("Ant", () => {
  describe("when reporting whether a grpah element has been visited", () => {
    const ant = new Ant([1, 2, 3]);
    it("should indicate if it has already visited a node", () => {
      expect(ant.hasVisited(2)).toBeTruthy();
    });
    it("should indicate if it has not visited a node", () => {
      expect(ant.hasVisited(5)).toBeFalsy();
    });
  });

  describe("when visiting a node", () => {
    it("should throw an exception if visiting an already visited node", () => {
      const ant = new Ant([1, 2, 3]);
      expect(() => ant.visit(2)).toThrow("ant path already contains '2'");
    });

    it("should visit in path as last elementt", () => {
      const ant = new Ant([1, 2, 3]);
      expect(ant.visit(4).currentLocation).toBe(4);
    });
  });

  it("should provide a means to report the last element visited in the graph", () => {
    const ant = new Ant([1, 2, 3]);
    expect(ant.currentLocation).toBe(3);
  });

  it("should support instantiation with empty path", () => {
    expect(() => {
      const ant = new Ant();
      expect(ant).toBeInstanceOf(Ant);
    }).not.toThrow();
  });

  describe("when indicating whether or not an ant has moved at all", () => {
    it("should indicate true if it has moved", () => {
      const ant = new Ant([2, 3]);
      expect(ant.hasMoved).toBeTruthy();
    });

    it("should indicate true if it has moved", () => {
      const ant = new Ant([]);
      expect(ant.hasMoved).toBeFalsy();
    });
  });
});
