export interface Scorable {
    score: number;
}

export type PhenomeType = number | string | object;

export class Phenome implements Scorable {
    public score: number = 0;
    constructor(private v: PhenomeType) {}

    get value() {
        return this.v;
    }

    withScore(score: number) {
        this.score = score;
        return this;
    }

    static from<T extends PhenomeType>(values: T[]) {
        return values.map((v) => new Phenome(v));
    }
}
