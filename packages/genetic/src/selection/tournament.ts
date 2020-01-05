import { range } from "ramda";
import { Chance } from "chance";

export type ContestFunction = <T>(contestant1: T, contestant2: T) => T;

export const tournamentFactory = <T>(
    numberOfRounds: number,
    contestFunction: ContestFunction
) => {
    const chance = new Chance();
    return (population: T[]) => [
        range(0, numberOfRounds).reduce(
            (champion, _round) =>
                contestFunction(champion, chance.pickone(population)),
            chance.pickone(population)
        )
    ];
};
