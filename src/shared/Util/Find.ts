import Logger from "shared/Logger";

export default function Find<T extends Instance>(instance: Instance, instanceName: string): T | undefined {
    if (!instance)
        Logger.UtilError("Find", "Instance is undefined");
    if (!instanceName)
        Logger.UtilError("Find", "Instance name undefined");
    return instance.FindFirstChild(instanceName, true) as T;
}