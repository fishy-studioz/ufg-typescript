import { KnitClient as Knit } from "@rbxts/knit";
import { UserInputService as UIS } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        InputController: typeof InputController;
    }
}

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

    MouseUp(inputType: Enum.UserInputType, callback: Callback): void {
        let callbacks = this.InputBeganCallbacks.get(inputType);
        if (!callbacks) {
            this.InputBeganCallbacks.set(inputType, []);
            callbacks = [];
        }

        callbacks.push(callback);
        this.InputBeganCallbacks.set(inputType, callbacks);
    },

    MouseDown(inputType: Enum.UserInputType, callback: Callback): void {
        let callbacks = this.InputBeganCallbacks.get(inputType);
        if (!callbacks) {
            this.InputBeganCallbacks.set(inputType, []);
            callbacks = [];
        }

        callbacks.push(callback);
        this.InputBeganCallbacks.set(inputType, callbacks);
    },

    KeysDown(keys: Enum.KeyCode[], callback: Callback): void {
        for (const key of keys)
            this.KeyDown(key, callback);
    },

    KeysUp(keys: Enum.KeyCode[], callback: Callback): void {
        for (const key of keys)
            this.KeyUp(key, callback);
    },

    KeyDown(key: Enum.KeyCode, callback: Callback): void {
        let callbacks = this.InputBeganCallbacks.get(key);
        if (!callbacks) {
            this.InputBeganCallbacks.set(key, []);
            callbacks = [];
        }

        callbacks.push(callback);
        this.InputBeganCallbacks.set(key, callbacks);
    },

     KeyUp(key: Enum.KeyCode, callback: Callback): void {
        let callbacks = this.InputEndedCallbacks.get(key);
        if (!callbacks) {
            this.InputEndedCallbacks.set(key, []);
            callbacks = [];
        }
        
        callbacks.push(callback);
        this.InputEndedCallbacks.set(key, callbacks);
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