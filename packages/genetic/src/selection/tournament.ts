import { range } from "ramda";
import { Chance } from "chance";

export type ContestFunction = <T>(contestant1: T, contestant2: T) => Promise<T>;

export const tournamentFactory = <T>(
    numberOfRounds: number,
    contestFunction: ContestFunction
) => {
    const chance = new Chance();
    const result = (population: T[]) => [
        await range(0, numberOfRounds).reduce(
            async (champion, _round) =>
                await contestFunction(champion, chance.pickone(population)),
            chance.pickone(population)
        )
    ];
    return Promise.resolve(result);
};
