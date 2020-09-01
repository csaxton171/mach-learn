import { Phenome, PhenomeValueType } from "../Phenome";
import { RandomNatural, chanceRandomNatural } from "../randomisation";
import { range } from "ramda";
import { strict as assert } from "assert";

const findUnallocated = (
    allocations: Map<PhenomeValueType, boolean>,
    phenome: Phenome
) => {
    const result = phenome.value.find((v) => !allocations.has(v));
    if (result !== undefined) {
        allocations.set(result, true);
        return result;
    }
    throw new Error(`unable to find unallocated value`);
};

const allocatedToOffspring = (
    currentAllocations: Map<PhenomeValueType, boolean>,
    index: number,
    parent: PhenomeValueType[],
    offspring: PhenomeValueType[]
) => {
    offspring[index] = parent[index];
    return currentAllocations.set(offspring[index], true);
};

export const crossoverMutationFactory = (
    cutLength: number,
    randomNatural: RandomNatural = chanceRandomNatural
) => (parent1: Phenome, parent2: Phenome) => {
    assert.ok(
        cutLength > 0,
        `invalid cutLength [${cutLength}]: must be greater than zero`
    );

    const offspring1 = new Array(parent1.value.length);
    const offspring2 = new Array(parent1.value.length);

    const cutPoint1 = randomNatural(0, offspring1.length - cutLength);
    const cutPoint2 = cutPoint1 + (cutLength - 1);

    const used1 = new Map<PhenomeValueType, boolean>();
    const used2 = new Map<PhenomeValueType, boolean>();

    for (let i = 0; i < parent1.value.length; i++) {
        if (i >= cutPoint1 && i <= cutPoint2) {
            allocatedToOffspring(used1, i, parent2.value, offspring1);
            allocatedToOffspring(used2, i, parent1.value, offspring2);
        }
    }

    range(0, parent1.value.length)
        .filter((i) => i < cutPoint1 || i > cutPoint2)
        .forEach((i) => {
            offspring1[i] = findUnallocated(used2, parent1);
            offspring2[i] = findUnallocated(used1, parent2);
        });

    return [new Phenome(offspring1), new Phenome(offspring2)];
};
