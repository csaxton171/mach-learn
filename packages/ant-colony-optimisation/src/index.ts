import { Config } from "./config";
import { Ant } from "./Ant";
import { ScoringFunction } from "./scoring";
import {
    PheromoneMatrix,
    initialisePheromoneMatrix,
    evaporatePheromoneMatrix,
    updatePheromoneMatrix
} from "./pheromonMatrix";
import { Chance } from "chance";
export type MoveProbabilityCalculator = (ant: Ant) => number[];

export const calculateProbability = <T>(
    config: Config,
    pheromonMatrix: PheromoneMatrix,
    graph: T[],
    score: ScoringFunction<T>
): MoveProbabilityCalculator => (ant: Ant): number[] => {
    const result = new Array<number>(graph.length);
    let d = 0;
    for (let l = 0; l < graph.length; l++) {
        const moveScore = score([graph[ant.currentLocation], graph[l]]);
        const movePheromone = pheromonMatrix[ant.currentLocation][l];
        if (!ant.hasVisited(l)) {
            d = d + movePheromone ** config.alpha * moveScore ** config.beta;
        }
    }

    for (let j = 0; j < graph.length; j++) {
        if (ant.hasVisited(j)) {
            result[j] = 0;
        } else {
            const moveScore = score([graph[ant.currentLocation], graph[j]]);
            const movePheromone = pheromonMatrix[ant.currentLocation][j];
            let n =
                movePheromone ** config.alpha *
                (1.0 / moveScore) ** config.alpha;
            result[j] = n / d;
        }
    }
    return result;
};

export interface RandomGraphIndex {
    getRandomGraphIndex: () => number;
}

export interface RandomNumber {
    getRandomNumber: (min: number, max: number) => number;
}

const chanceRandom = <T>(graph: T[]) => ({
    getRandomNumber: (min: number, max: number) =>
        new Chance().floating({ min, max }),
    getRandomGraphIndex: () =>
        new Chance().integer({ min: 0, max: graph.length - 1 })
});

export type NextMoveCalculator = (ant: Ant) => number;

export const calculateNextMove = <T>(
    config: Config,
    graph: T[],
    random: RandomGraphIndex & RandomNumber,
    calculateProbability: MoveProbabilityCalculator
): NextMoveCalculator => (ant: Ant) => {
    const wanderProb = random.getRandomNumber(0.0, 1.0);
    if (!ant.hasMoved || wanderProb < config.pr) {
        let index = -1;
        while (index === -1 || ant.hasVisited(index)) {
            index = random.getRandomGraphIndex();
        }
        // console.log(
        //     `>>RAND>>|${ant.hasMoved}|${wanderProb}<${config.pr}| ['${graph[index]}']`,
        //     dumpAnts([ant], graph)
        // );
        return index;
    }
    const probabilities = calculateProbability(ant);
    const r = random.getRandomNumber(0.0, 1.0);
    // console.log(
    //     `>>PROBS>>|${r}|`,
    //     probabilities.map(
    //         (p, i) => `${graph[i]}|${p.toString().substring(0, 5)}`
    //     ),
    //     dumpAnts([ant], graph)
    // );
    let sum = 0;
    for (let i = 0; i < graph.length; i++) {
        sum += probabilities[i];
        if (sum >= r) {
            return i;
        }
    }
    return -1;
};

export const march = <T>(
    graph: T[],
    ants: Ant[],
    nextMove: NextMoveCalculator
): Ant[] => {
    for (let i = 0; i < graph.length; i++) {
        ants.forEach(ant => {
            ant.visit(nextMove(ant));
        });
    }
    return ants;
};

export type IterationResult<T> = {
    iteration: number;
    result: T[];
    score: number;
};

export function* iterate<T>(
    config: Config,
    graph: T[],
    score: ScoringFunction<T>,
    maxIterations: number = 100
): Generator<IterationResult<T>> {
    let pheromoneMatrix = initialisePheromoneMatrix(
        graph.length,
        config.initialPheromone
    );
    const nextMove = calculateNextMove(
        config,
        graph,
        chanceRandom(graph),
        calculateProbability(config, pheromoneMatrix, graph, score)
    );

    for (let iteration = 1; iteration <= maxIterations; iteration++) {
        const ants = march(graph, Ant.createColony(config.antCount), nextMove);
        pheromoneMatrix = evaporatePheromoneMatrix(config, pheromoneMatrix);
        pheromoneMatrix = updatePheromoneMatrix(
            config,
            score,
            pheromoneMatrix,
            graph,
            ants
        );
        yield { iteration, score: 0, result: graph };
    }
}
