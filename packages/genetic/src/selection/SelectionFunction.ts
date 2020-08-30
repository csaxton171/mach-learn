import { Phenome } from "../Phenome";

export type SelectionFunction = (population: Phenome[]) => Promise<Phenome[]>;
