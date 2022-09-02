import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        ProgressionService: typeof ProgressionService;
    }
}

const ProgressionService = Knit.CreateService({
    Name: "ProgressionService",

    Client: {
        AdventureLevelCalculator(plr: Player, xp: number): number {
            return this.Server.AdventureLevelCalculator(xp);
        },
        AdventureExpCalculator(plr: Player, level: number): number {
            return this.Server.AdventureExpCalculator(level);
        },
        CharLevelCalculator(plr: Player, xp: number): number {
            return this.Server.CharLevelCalculator(xp);
        }
    },

    CharLevelCalculator(xp: number): number {
        return this.AdventureLevelCalculator(xp);
    },

    CharEvolutionCalculator(xp: number): number {
        const charLvl = this.CharLevelCalculator(xp);
        return math.floor(0);
    },

    AdventureExpCalculator(adventureLevel: number): number {
        return math.floor(500 * ((adventureLevel + 1/2) ** 2 - 1/4));
    },

    AdventureLevelCalculator(xp: number): number {
        // return math.floor(1 + (xp / (1000 ** (xp ** -0.01))))
        return math.floor((1/4 + xp / 500) ** 0.5 - 1/2);
    }
});

export = ProgressionService;