export default function RemoveY(vec: Vector3): Vector3 {
    return new Vector3(vec.X, 0, vec.Z);
}