export interface Config {
    /** number of ants employed in the algorithm */
    antCount: number;
    /** constant specifies the attractiveness of the pheromone trail */
    alpha: number;
    /** constant sets the attractiveness of better state transitions (from one node to another) */
    beta: number;
    /** constant determines how quickly the pheromone trail evaporates */
    evaporation: number;
    /** constant controls the amount of pheromone that the nodes of a path share for a trip */
    q: number;
    /** term is the initial value of the pheromone trails */
    initialPheromone: number;
    /** the probability that an ant will simply wander to any cell */
    pr: number;
}

export const defaultConfig: Config = {
    antCount: 30,
    alpha: 1,
    beta: 5,
    evaporation: 0.5,
    q: 500,
    initialPheromone: 1.0,
    pr: 0.01
};
