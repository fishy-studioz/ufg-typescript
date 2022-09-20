export default function RandomElement<T = unknown>(arr: T[]): T {
    return arr[math.random(arr.size()) - 1];
}