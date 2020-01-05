import { Chance } from "chance";

export const truncationFactory = <T>(breedingRatio: number) => {
    if (breedingRatio > 1) {
        throw new Error(
            `breeding ratio '${breedingRatio}' value must be less than 1.`
        );
    }
    const chance = new Chance();
    return (population: T[]) => {
        const count = Math.round(population.length * breedingRatio);
        return [population[chance.natural({ min: 0, max: count - 1 })]];
    };
};
