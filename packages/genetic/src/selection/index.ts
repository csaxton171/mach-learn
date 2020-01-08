export type SelectionFunction = <T>(population: T[]) => Promise<T[]>;

export { tournamentFactory } from "./tournament";
export { truncationFactory } from "./trunctation";
