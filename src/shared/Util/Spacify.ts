import { StringBuilder } from "./StringBuilder";

function CharAt(n: number, s: string): string {
    return s.sub(n + 1, n + 1);
}

function IsUpper(s: string): boolean {
    return s.upper() === s;
}

export function Spacify(text: string, preserveAcronyms = false): string {
    if (text === "")
        return text;

    const newText = new StringBuilder(CharAt(0, text));
    for (let i = 1; i < text.size(); i++) {
        if (IsUpper(CharAt(i, text)))
            if (
                (CharAt(i - 1, text) !== " " 
                && !IsUpper(CharAt(i - 1, text)))
                || (preserveAcronyms && IsUpper(CharAt(i - 1, text))
                && i < text.size() - 1 && IsUpper(CharAt(i + 1, text)))
            ) {
                newText.Append(" ");
            }

        newText.Append(CharAt(i, text));
    }
    return newText.ToString();
}