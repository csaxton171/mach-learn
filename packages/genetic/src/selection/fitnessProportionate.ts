import { SelectionFunction } from "./SelectionFunction";
import { Phenome } from "../Phenome";
import { Chance } from "chance";
import { strict as assert } from "assert";

type RandomPercentage = () => number;

const chanceRandomPercentage: RandomPercentage = () =>
    new Chance().floating({ min: 0, max: 1 });

export const fitnessProportionateFactory = (
    randomPercentage: RandomPercentage = chanceRandomPercentage
): SelectionFunction => {
    return async <T extends Phenome>(population: T[]) => {
        const totalScore = population.reduce(
            (sum, { score }) => sum + score,
            0
        );
        const targetPercentage = randomPercentage();
        assert.ok(
            targetPercentage <= 1 && targetPercentage >= 0,
            `invalid percentage: [${targetPercentage}] randomPercentage must return a value between 0 and 1 inclusive`
        );

        let coveredSorFar = 0;
        for (let individual of population) {
            coveredSorFar += individual.score / totalScore;
            if (targetPercentage < coveredSorFar) {
                return [individual];
            }
        }

        return [];
    };
};
