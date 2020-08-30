import { SelectionFunction } from "./SelectionFunction";
import { Phenome, PhenomeValueType } from "../Phenome";
import { strict as assert } from "assert";
import { RandomFloat, chanceRandomFloat } from "../randomisation";

export type ScoringFunction = (subject: Phenome<PhenomeValueType>) => number;

export const fitnessProportionateFactory = (
    score: ScoringFunction,
    randomFloat: RandomFloat = chanceRandomFloat
): SelectionFunction => {
    return async <T extends Phenome<PhenomeValueType>>(population: T[]) => {
        const totalScore = population.reduce(
            (sum, phenome) => sum + score(phenome),
            0
        );
        const targetPercentage = randomFloat(0, 1);
        assert.ok(
            targetPercentage <= 1 && targetPercentage >= 0,
            `invalid percentage: [${targetPercentage}] randomPercentage must return a value between 0 and 1 inclusive`
        );

        let coveredSorFar = 0;
        for (let individual of population) {
            coveredSorFar += score(individual) / totalScore;
            if (targetPercentage < coveredSorFar) {
                return [individual];
            }
        }

        return [];
    };
};
