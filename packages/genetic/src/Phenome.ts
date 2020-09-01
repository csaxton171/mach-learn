import { clone } from "ramda";

export type PhenomeValueType = number | string | object;

export class Phenome {
    public score: number = 0;
    constructor(private v: PhenomeValueType[]) {}

    get value() {
        return this.v;
    }

    clone() {
        return new Phenome(clone(this.value));
    }

    withScore(score: number) {
        this.score = score;
        return this;
    }
}
