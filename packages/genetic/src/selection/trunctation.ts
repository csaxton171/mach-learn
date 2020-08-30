import { SelectionFunction } from "./SelectionFunction";
import { Phenome, PhenomeValueType } from "../Phenome";
import { RandomNatural, chanceRandomNatural } from "../randomisation";
import { strict as assert } from "assert";

export const truncationFactory = (
    breedingRatio: number,
    randomNatural: RandomNatural = chanceRandomNatural
): SelectionFunction => {
    assert.ok(
        breedingRatio < 1,
        `breeding ratio '${breedingRatio}' value must be less than 1.`
    );
    return async <P extends PhenomeValueType, T extends Phenome<P>>(
        population: T[]
    ) => {
        const count = Math.round(population.length * breedingRatio);
        return [population[randomNatural(0, count - 1)]];
    };
};
