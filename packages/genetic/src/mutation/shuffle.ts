import { Phenome, PhenomeValueType } from "../Phenome";
import { strict as assert } from "assert";
import { Chance } from "chance";
import { range } from "ramda";

export type RandomIndex = (values: PhenomeValueType[]) => number;

export const chanceRandomIndex = (values: PhenomeValueType[]) =>
    new Chance().natural({ min: 0, max: values.length - 1 });

export const shuffleMutationFactory = (
    flips: number,
    randomIndex: RandomIndex = chanceRandomIndex
) => (parent: Phenome) => {
    const offspring = parent.clone();
    assert.ok(Array.isArray(offspring.value), "phenome value must be an array");
    assert.ok(
        (offspring.value as []).length > 1,
        "supplied value must have at least 2 elements"
    );
    return range(0, flips).reduce((offspring) => {
        const values = offspring.value as [];
        const idx1 = randomIndex(values);
        let idx2 = -1;

        while (idx2 === -1 || idx2 === idx1) {
            idx2 = randomIndex(values);
        }
        const temp = values[idx1];
        values[idx1] = values[idx2];
        values[idx2] = temp;

        return offspring;
    }, offspring);
};
