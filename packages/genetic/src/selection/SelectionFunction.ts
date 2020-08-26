import { Phenome } from "../Phenome";

export type SelectionFunction = <T extends Phenome>(
    population: T[]
) => Promise<T[]>;
