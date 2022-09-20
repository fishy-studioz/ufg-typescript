/* eslint-disable no-constant-condition */
export default function FormatInt(x: number): string {
    let formatted: string = tostring(x);
    while (true) {
        const tuple = formatted.gsub("^(-?%d+)(%d%d%d)", "%1,%2");
        const k = tuple[1];
        formatted = tuple[0];

        if (k === 0)
            break;
    }
    return formatted;
}