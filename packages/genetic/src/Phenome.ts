import { clone } from "ramda";
export interface Scorable {
    score: number;
}

export type PhenomeValueType = number | string | object;

export interface Phenome {
    value: PhenomeValueType | PhenomeValueType[];
    clone: () => Phenome;
}

export class ScorablePhenome implements Phenome, Scorable {
    public score: number = 0;
    constructor(private v: PhenomeValueType | PhenomeValueType[]) {}

    get value() {
        return this.v;
    }

    clone() {
        return new ScorablePhenome(clone(this.value));
    }

    withScore(score: number) {
        this.score = score;
        return this;
    }

    static from<T extends PhenomeValueType>(values: T[]) {
        return values.map((v) => new ScorablePhenome(v));
    }
}
