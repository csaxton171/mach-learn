import { Config } from "./config";
import { ScoringFunction } from "./scoring";
import { Ant } from "./Ant";
export type PheromoneMatrix = number[][];

export const initialisePheromoneMatrix = (
    numberOfItmes: number,
    initialPheromone: number
): PheromoneMatrix => {
    return new Array(numberOfItmes).fill(
        new Array(numberOfItmes).fill(initialPheromone)
    );
};

export const updatePheromoneMatrix = <T>(
    config: Config,
    score: ScoringFunction<T>,
    pheromonMatrix: PheromoneMatrix,
    graph: T[],
    ants: Ant[]
): PheromoneMatrix => {
    let d: number = 0;
    const result = JSON.parse(JSON.stringify(pheromonMatrix));
    ants.forEach(ant => {
        d = config.q / ant.score(graph, score);
        for (let i = 0; i < graph.length - 1; i++) {
            result[ant.locationAt(i)][ant.locationAt(i + 1)] =
                result[ant.locationAt(i)][ant.locationAt(i + 1)] + d;
        }
    });

    // console.log(dumpPheromoneMatrix(result));
    return result;
};

export const evaporatePheromoneMatrix = (
    config: Config,
    pheromonMatrix: PheromoneMatrix
): PheromoneMatrix => {
    const result = JSON.parse(JSON.stringify(pheromonMatrix));
    for (let r = 0; r < result.length; r++) {
        for (let c = 0; c < result[r].length; c++) {
            result[r][c] *= config.evaporation;
        }
    }
    // console.log(dumpPheromoneMatrix(result));
    return result;
};

export const dumpPheromoneMatrix = (matrix: PheromoneMatrix): string =>
    matrix.reduce(
        (a, c) =>
            `${a}|${c
                .map(i => `${i}`.substring(0, 9).padStart(10))
                .join(" |")} |\n`,
        ""
    );
