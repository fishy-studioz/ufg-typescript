export default function IsNaN(value: unknown) {
    if (typeOf(value) !== "number")
        return true;
    return value !== value;
}