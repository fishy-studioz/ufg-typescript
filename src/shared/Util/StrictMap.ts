import Logger from "shared/Logger";

export default class StrictMap<K, V> {
    private readonly cache: Map<K, V>;

    public constructor(base: ReadonlyArray<readonly [K, V]> = []) {
        this.cache = new Map<K, V>(base);
    }

    public Size(): number {
        return this.cache.size();
    }

    public Delete(key: K): boolean {
        return this.cache.delete(key);
    }

    public Set(key: K, value: V): StrictMap<K, V> {
        this.cache.set(key, value);
        return this;
    }

    public Get(key: K): V {
        const value: V | undefined = this.cache.get(key);
        if (!value)
            throw Logger.UtilError("StrictMap.Get", `Key "${key}" has no value associated with it.`);
        else
            return <V>value;
    }

    public ForEach(callback: (value: V, key: K) => void): void {
        this.cache.forEach(callback);
    }
}