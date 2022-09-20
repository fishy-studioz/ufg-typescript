export default function FindAncestor<T extends Instance>(instance: Instance, instanceName: string): T {
    return instance.FindFirstAncestor(instanceName) as T;
}