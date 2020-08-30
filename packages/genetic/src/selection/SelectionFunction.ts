import { Phenome, PhenomeValueType } from "../Phenome";

export type SelectionFunction = <
    P extends PhenomeValueType,
    T extends Phenome<P>
>(
    population: T[]
) => Promise<T[]>;
