import { KnitServer as Knit } from "@rbxts/knit";
import CharacterList from "server/Classes/CharacterList";
import { Character } from "shared/Classes/Character";

declare global {
    interface KnitServices {
        CharacterService: typeof CharacterService;
    }
}

const CharacterService = Knit.CreateService({
    Name: "CharacterService",

    Client: {
        GetData(plr: Player, charName: string): Character | undefined {
            return this.Server.GetData(charName);
        }
    },

    GetData(charName: string): Character | undefined {
        const charData = CharacterList.find(ch => ch.Name === charName);
        return charData;
    }
});

export = CharacterService;