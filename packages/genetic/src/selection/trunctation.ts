import { Chance } from "chance";
import { SelectionFunction } from "./SelectionFunction";
import { Phenome } from "../Phenome";
import { strict as assert } from "assert";

export const truncationFactory = (breedingRatio: number): SelectionFunction => {
    assert.ok(
        breedingRatio < 1,
        `breeding ratio '${breedingRatio}' value must be less than 1.`
    );
    const chance = new Chance();
    return async <T extends Phenome>(population: T[]) => {
        const count = Math.round(population.length * breedingRatio);
        return [population[chance.natural({ min: 0, max: count - 1 })]];
    };
};
