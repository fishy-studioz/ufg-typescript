import { KnitServer as Knit } from "@rbxts/knit";
import { Character, Element } from "shared/Classes/Character";
import CharacterList from "server/Classes/CharacterList";

declare global {
    interface KnitServices {
        CharacterService: typeof CharacterService;
    }
}

const data = Knit.GetService("DataService");
const CharacterService = Knit.CreateService({
    Name: "CharacterService",

    Client: {
        GetData(plr: Player, charName: string): Character | undefined {
            return this.Server.GetData(charName);
        },
        GetFromParty(plr: Player, slot: number): Character {
            return this.Server.GetFromParty(plr, slot);
        },
        GetCurrent(plr: Player): Character {
            return this.Server.GetCurrent(plr);
        },
        GetElements(): typeof Element {
            return this.Server.GetElements();
        }
    },

    GetElements(): typeof Element {
        return Element;
    },

    GetCurrent(plr: Player): Character {
        const slot = data.Get<number>(plr, "equippedCharacter");
        return this.GetFromParty(plr, slot);
    },

    GetFromParty(plr: Player, slot: number): Character {
        const partySetup = data.Get<string[]>(plr, "partySetup");
        const charName = partySetup[slot - 1];
        return this.GetData(charName)!;
    },

    GetData(charName: string): Character | undefined {
        const charData = CharacterList.find(ch => ch.Name === charName);
        return charData;
    }
});

export = CharacterService;