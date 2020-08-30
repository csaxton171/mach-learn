import { clone } from "ramda";
export interface Scorable {
    score: number;
}

export type PhenomeValueType = number | string | object;

export interface Phenome<T extends PhenomeValueType> {
    value: T[];
    clone: () => Phenome<T>;
}

export class ScorablePhenome<T extends PhenomeValueType>
    implements Phenome<T>, Scorable {
    public score: number = 0;
    constructor(private v: T[]) {}

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
}
