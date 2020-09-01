import { PhenomeValueType, Phenome } from "./Phenome";
import { ScoringFunction } from "./ScoringFunction";
import { Chance } from "chance";
import { range } from "ramda";
import { strict as assert } from "assert";

export interface GenerateConfig {
    populationSize: number;
    elitismCount: number;
    maxGenerations: number;
}

const createPopulation = (size: number, subject: PhenomeValueType[]) => {
    const chance = new Chance();

    return range(0, size).map((_) => new Phenome(chance.shuffle(subject)));
};

export function* generateDiscrete(
    config: GenerateConfig,
    subject: PhenomeValueType[],
    scoringFn: ScoringFunction
) {
    const { populationSize } = config;
    assert.ok(
        populationSize > 0,
        `invalid population size [${populationSize}]`
    );
    const population = createPopulation(populationSize, subject);
    for (let genNum = 1; genNum <= config.maxGenerations; genNum++) {
        //
        // score population
        // find fittest phenome
        yield population[0];
    }
}
