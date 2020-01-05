import { Chance } from "chance";

export interface RandomGraphIndex {
    getRandomGraphIndex: () => number;
}

export interface RandomNumber {
    getRandomNumber: (min: number, max: number) => number;
}

export const chanceRandomFactory = <T>(graph: T[]) => {
    const randomGenerator = new Chance();
    return {
        getRandomNumber: (min: number, max: number) =>
            randomGenerator.floating({ min, max }),
        getRandomGraphIndex: () =>
            randomGenerator.integer({ min: 0, max: graph.length - 1 })
    };
};
