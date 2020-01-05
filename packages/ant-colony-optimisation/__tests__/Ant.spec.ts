import { Ant, dumpAnts } from "../src/Ant";

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

  it("should provide provide path representation in terms of graph elements", () => {
    const graph = ["A", "B", "C", "D"];
    const ant = new Ant([1, 3, 0]);

    expect(ant.toGraph(graph)).toEqual(["B", "D", "A"]);
  });

  it("should provide a string representation of its path in terms of graph elements", () => {
    expect(new Ant([0, 1, 2]).toString(["A", "B", "C"])).toEqual("A,B,C");
  });

  describe("when creating a colony", () => {
    let colony: Ant[];
    const expectedAntCount = 13;
    beforeEach(() => {
      colony = Ant.createColony(expectedAntCount);
    });

    it("should create a colony sized according to supplied value", () => {
      expect(colony.length).toEqual(expectedAntCount);
    });
    it("should create a colony initialised with untravelled ants", () => {
      expect(colony.every(ant => !ant.hasMoved)).toBeTruthy();
    });
  });

  it("should support dumping ants", () => {
    const graph = ["A", "B", "C", "D"];
    const ants = [new Ant([0, 1]), new Ant([2, 3])];

    expect(dumpAnts(ants, graph)).toEqual(`>o[A,B]\n>o[C,D]`);
  });
});
