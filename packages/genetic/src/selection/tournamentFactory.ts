import { Chance } from "chance";
import { SelectionFunction } from "./SelectionFunction";
import { Phenome } from "../Phenome";
import { strict as assert } from "assert";

export type ContestFunction = <T extends Phenome>(
    contestant1: T,
    contestant2: T
) => Promise<T>;

type RandomPick = {
    pickone: <T extends Phenome>(items: T[]) => T;
};

const pickPeer = <T extends Phenome>(
    random: RandomPick,
    champion: T,
    population: T[]
): T => {
    let peer: T = champion;
    assert.ok(population.length > 0, "population must have elements");
    while (peer === champion) {
        peer = random.pickone(population);
    }
    return peer;
};

export const tournamentFactory = (
    numberOfRounds: number,
    contestFunction: ContestFunction
): SelectionFunction => {
    const chance = new Chance();
    return async <T extends Phenome>(population: T[]) => {
        let champion = chance.pickone(population);
        for (let i = 0; i < numberOfRounds; i++) {
            champion = await contestFunction(
                champion,
                pickPeer(chance, champion, population)
            ) /* ? */;
        }
        return [champion];
    };
};
