import { Phenome, PhenomeValueType, ScorablePhenome } from "../Phenome";
import { RandomNatural, chanceRandomNatural } from "../randomisation";
import { range } from "ramda";
import { strict as assert } from "assert";

const findUnallocated = <T extends PhenomeValueType>(
    allocations: Map<PhenomeValueType, boolean>,
    phenome: Phenome<T>
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
) => <T extends PhenomeValueType>(parent1: Phenome<T>, parent2: Phenome<T>) => {
    assert.ok(
        cutLength > 0,
        `invalid cutLength [${cutLength}]: must be greater than zero`
    );

    const offspring1 = new Array<T>(parent1.value.length);
    const offspring2 = new Array<T>(parent1.value.length);

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

    // for (let i = 0; i < parent1.value.length; i++) {
    //     if (i < cutPoint1 || i > cutPoint2) {
    //         offspring1[i] = findUnallocated(used2, parent1);
    //         offspring2[i] = findUnallocated(used1, parent2);
    //     }
    // }

    return [new ScorablePhenome(offspring1), new ScorablePhenome(offspring2)];
};
