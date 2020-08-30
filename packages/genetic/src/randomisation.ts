import { Chance } from "chance";

const chance = new Chance();

export type RandomNatural = (min: number, max: number) => number;
export type RandomFloat = (min: number, max: number) => number;

export type RandomIndex = (subject: any[]) => number;

export type RandomSelectN = (selections: any[], count?: number) => any[];

export const chanceRandomNatural: RandomNatural = (min: number, max: number) =>
    chance.natural({ min, max });

export const chanceRandomFloat: RandomFloat = (min: number, max: number) =>
    new Chance().floating({ min, max });

export const chanceRandomIndex: RandomIndex = (subject: any[]) =>
    chanceRandomNatural(0, subject.length - 1);

export const chanceRandomSelectN = <T>(selections: T[], count: number = 1) =>
    chance.pickset(selections, count);
