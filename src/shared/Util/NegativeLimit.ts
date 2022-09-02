import Limit from "./Limit";
export default function NegativeLimit(n: number, limit: number): number {
    return Limit(n, -limit, limit);
}