export type SelectionFunction = <T>(population: T[]) => T[];

export { tournamentFactory } from "./tournament";
export { truncationFactory } from "./trunctation";
