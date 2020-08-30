import { SelectionFunction } from "./SelectionFunction";
import { Phenome, PhenomeValueType } from "../Phenome";
import { RandomSelectN, chanceRandomSelectN } from "../randomisation";
import { strict as assert } from "assert";

export type ContestFunction = <
    P extends PhenomeValueType,
    T extends Phenome<P>
>(
    contestant1: T,
    contestant2: T
) => Promise<T>;

const pickPeer = <P extends PhenomeValueType, T extends Phenome<P>>(
    randomSelect: RandomSelectN,
    champion: T,
    population: T[]
): T => {
    let peer: T = champion;
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
    return async <P extends PhenomeValueType, T extends Phenome<P>>(
        population: T[]
    ) => {
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
