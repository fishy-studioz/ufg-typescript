export class Pair<T> {
    public constructor(
        public First: T,
        public Second: T
    ) {}
}

export class TypedPair<T1, T2> {
    public constructor(
        public First: T1,
        public Second: T2
    ) {}
}