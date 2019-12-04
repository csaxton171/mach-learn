export type ScoringFunction<T> = (subject: T[]) => number;

export const alphaDistanceScore = (graph: string[]) => {
    const minPossibleDistance = graph.length - 1;
    const maxPossibleDistance =
        ("Z".charCodeAt(0) - "A".charCodeAt(0)) * (graph.length - 1);

    const graphDistance = graph
        .map(c => c.toUpperCase().charCodeAt(0))
        .reduce(
            (acc, cur, idx, src) => acc + (Math.abs(cur - src[idx + 1]) || 0),
            0
        );
    const d = graphDistance - minPossibleDistance;
    const dPct = d / (maxPossibleDistance - minPossibleDistance);
    return 1 - dPct;
};

export const alphaOrderRankScore = (graph: string[]): number => {
    const disorderInstances = graph
        .map(c => c.toUpperCase().charCodeAt(0))
        .reduce((acc, cur, idx, array) => {
            const disorderMagnitude = array[idx + 1] - cur;
            return disorderMagnitude < 0
                ? [...acc, Math.abs(disorderMagnitude)]
                : acc;
        }, new Array<number>());
    return 1 - disorderInstances.length / (graph.length - 1);
};
