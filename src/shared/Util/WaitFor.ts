import Logger from "shared/Logger";

export default function WaitFor<T extends Instance>(instance: Instance, instanceName: string): T {
    if (!instance)
        Logger.UtilError("WaitFor", "Instance is undefined");
    if (!instanceName)
        Logger.UtilError("WaitFor", "Instance name undefined");
    return instance.WaitForChild(instanceName, 10) as T;
}