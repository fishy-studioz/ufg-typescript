export class StringBuilder {
    public constructor(
        private Content: string = ""
    ) {}

    public Append(...text: string[]): StringBuilder {
        for (const s of text) 
            this.Content += s;

        return this;
    }

    public AppendLine(...text: string[]): StringBuilder {
        for (const s of text) 
            this.Content += s;

        return this.Append("\n");
    }

    public ToString(): string {
        return this.Content;
    }
}