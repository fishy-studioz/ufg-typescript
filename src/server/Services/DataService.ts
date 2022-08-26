import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { RunService } from "@rbxts/services";
import DataStore2 from "@rbxts/datastore2";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DataService: typeof DataService;
    }
}

const keys = ["characterSetups", "partySetup", "location", "adventureXP", "equippedCharacter"];
const DataService = Knit.CreateService({
    Name: "DataService",

    DataUpdated: new Signal<(plr: Player, name: string, value: defined) => void>(),
    Client: {
        DataUpdated: new RemoteSignal<(name: string, value: defined) => void>(),
        Get<T = defined>(plr: Player, name: string, defaultValue?: T): T {
            return this.Server.Get(plr, name, defaultValue);
        },
        Set<T = unknown>(plr: Player, name: string, value: T): void {
            this.Server.Set(plr, name, value);
        },
        GetKeys(): string[] {
            return keys;
        }
    },

    KnitInit() {
        Logger.ComponentActive(this.Name);
        DataStore2.Combine("DATA", ...keys);
    },

    GetRawStore<V = unknown>(plr: Player, name: string): DataStore2<V> {
        return DataStore2<V>(name, plr);
    },

    Get<V = defined>(plr: Player, name: string, defaultValue?: V): V {
        const store = this.GetRawStore<V>(plr, name);
        return store.Get(defaultValue) as V;
    },

    Set<V = unknown>(plr: Player, name: string, value: V): void {
        const store = this.GetRawStore<V>(plr, name);
        store.Set(value);
    },

    Increment(plr: Player, name: string, amount: number): void {
        const value = this.Get<number>(plr, name);
        this.Set(plr, name, value + amount);
    },

    Store<V extends defined = defined>(plr: Player, name: string, defaultValue: V): DataStore2<V> {
        const store = DataStore2<V>(name, plr);
        const remote = this.Client.DataUpdated;
        const signal = this.DataUpdated
        const callRemote = (value: V) => {
            remote.Fire(plr, name, value);
            signal.Fire(plr, name, value);
        }
        store.OnUpdate(callRemote);
        callRemote(store.Get(defaultValue));
        return store;
    }
});

export = DataService;