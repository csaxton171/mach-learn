import { SelectionFunction } from "./SelectionFunction";
import { Phenome } from "../Phenome";
import { RandomSelectN, chanceRandomSelectN } from "../randomisation";
import { strict as assert } from "assert";

export type ContestFunction = (
    contestant1: Phenome,
    contestant2: Phenome
) => Promise<Phenome>;

const pickPeer = (
    randomSelect: RandomSelectN,
    champion: Phenome,
    population: Phenome[]
): Phenome => {
    let peer: Phenome = champion;
    assert.ok(population.length > 0, "population must have elements");
    while (peer === champion) {
        peer = randomSelect(population)[0];
    }
    return peer;
};

export const tournamentFactory = (
    numberOfRounds: number,
    contestFunction: ContestFunction,
    randomSelect: RandomSelectN = chanceRandomSelectN
): SelectionFunction => {
    return async (population: Phenome[]) => {
        let champion = randomSelect(population)[0];
        for (let i = 0; i < numberOfRounds; i++) {
            champion = await contestFunction(
                champion,
                pickPeer(randomSelect, champion, population)
            );
        }
        return [champion];
    };
};
