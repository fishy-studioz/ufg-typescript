import { KnitClient as Knit } from "@rbxts/knit";
import { UserInputService as UIS } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        InputController: typeof InputController;
    }
}

type DisconnectCallback = () => void

const { UserInputType: InputType } = Enum;
const InputController = Knit.CreateController({
    Name: "InputController",
    IsMouseDown: false,
    InputBeganCallbacks: new Map<Enum.KeyCode | Enum.UserInputType, Callback[]>(),
    InputEndedCallbacks: new Map<Enum.KeyCode | Enum.UserInputType, Callback[]>(),

    MiceDown(inputTypes: Enum.UserInputType[], callback: Callback): void {
        for (const inputType of inputTypes)
            this.MouseDown(inputType, callback);
    },

    MiceUp(inputTypes: Enum.UserInputType[], callback: Callback): void {
        for (const inputType of inputTypes)
            this.MouseUp(inputType, callback);
    },

    MouseUp(itype: Enum.UserInputType, callback: Callback): DisconnectCallback {
        const endedCallbacks = this.InputEndedCallbacks;
        let callbacks = endedCallbacks.get(itype);
        if (!callbacks) {
            endedCallbacks.set(itype, []);
            callbacks = [];
        }

        callbacks.push(callback);
        endedCallbacks.set(itype, callbacks);

        return function(): void {
            const callbacks = endedCallbacks.get(itype)!;
            callbacks.remove(callbacks.indexOf(callback));
            endedCallbacks.set(itype, callbacks);
        }
    },

    MouseDown(itype: Enum.UserInputType, callback: Callback): DisconnectCallback {
        const beganCallbacks = this.InputBeganCallbacks;
        let callbacks = beganCallbacks.get(itype);
        if (!callbacks) {
            beganCallbacks.set(itype, []);
            callbacks = [];
        }

        callbacks.push(callback);
        beganCallbacks.set(itype, callbacks);

        return function(): void {
            const callbacks = beganCallbacks.get(itype)!;
            callbacks.remove(callbacks.indexOf(callback));
            beganCallbacks.set(itype, callbacks);
        }
    },

    KeysDown(keys: Enum.KeyCode[], callback: Callback): void {
        for (const key of keys)
            this.KeyDown(key, callback);
    },

    KeysUp(keys: Enum.KeyCode[], callback: Callback): void {
        for (const key of keys)
            this.KeyUp(key, callback);
    },

    KeyDown(key: Enum.KeyCode, callback: Callback): DisconnectCallback {
        const beganCallbacks = this.InputBeganCallbacks;
        let callbacks = beganCallbacks.get(key);
        if (!callbacks) {
            beganCallbacks.set(key, []);
            callbacks = [];
        }
        
        callbacks.push(callback);
        beganCallbacks.set(key, callbacks);
        
        return function(): void {
            const callbacks = beganCallbacks.get(key)!;
            callbacks.remove(callbacks.indexOf(callback));
            beganCallbacks.set(key, callbacks);
        }
    },

     KeyUp(key: Enum.KeyCode, callback: Callback): DisconnectCallback {
        const endedCallbacks = this.InputEndedCallbacks;
        let callbacks = endedCallbacks.get(key);
        if (!callbacks) {
            endedCallbacks.set(key, []);
            callbacks = [];
        }
        
        callbacks.push(callback);
        endedCallbacks.set(key, callbacks);

        return function(): void {
            const callbacks = endedCallbacks.get(key)!;
            callbacks.remove(callbacks.indexOf(callback));
            endedCallbacks.set(key, callbacks);
        }
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        UIS.InputBegan.Connect(({ UserInputType: itype, KeyCode: key }, processed) => {
            if (processed) return;
            if (itype === InputType.MouseButton1)
                this.IsMouseDown = true;

            const callbacks = this.InputBeganCallbacks.get(itype) || this.InputBeganCallbacks.get(key);
            if (callbacks)
                for (const callback of callbacks)
                    callback();
        });
        UIS.InputEnded.Connect(({ UserInputType: itype, KeyCode: key  }, processed) => {
            if (processed) return;
            if (itype === InputType.MouseButton1)
                this.IsMouseDown = false;

            const callbacks = this.InputEndedCallbacks.get(itype) || this.InputEndedCallbacks.get(key);
            if (callbacks)
                for (const callback of callbacks)
                    callback();
        });
    }
});

export = InputController;