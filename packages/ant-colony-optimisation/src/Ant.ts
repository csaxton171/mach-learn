import { ScoringFunction } from "./scoring";

export class Ant {
    /** contains graph coordinates/index representing where the ant travelled */
    private readonly path: number[];
    constructor(path: number[] = new Array<number>()) {
        this.path = path;
    }

    get currentLocation() {
        return this.path[this.path.length - 1];
    }

    locationAt(pathIndex: number): number {
        return this.path[pathIndex];
    }

    get hasMoved() {
        return this.path.length > 0;
    }

    hasVisited(graphIndex: number) {
        return this.path.includes(graphIndex);
    }

    visit(graphIndex: number) {
        if (this.path.includes(graphIndex)) {
            throw new Error(`ant path already contains '${graphIndex}'`);
        }
        this.path.push(graphIndex);
        return this;
    }

    score<T>(graph: T[], score: ScoringFunction<T>): number {
        return score(this.path.map(i => graph[i]));
    }

    toString<T>(graph: T[]) {
        return `${this.toGraph(graph)}`;
    }

    toGraph<T>(graph: T[]) {
        return this.path.map(i => graph[i]);
    }

    static createColony(antCount: number): Ant[] {
        return Array(antCount)
            .fill("")
            .map(() => new Ant());
    }
}

export const dumpAnts = <T>(ants: Ant[], graph: T[]) =>
    `${ants.map(a => `>o[${a.toString(graph)}]`).join("\n")}`;
