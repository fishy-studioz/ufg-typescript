import { KnitServer as Knit } from "@rbxts/knit";
import { GamePassService as Gamepass, MarketplaceService, Players } from "@rbxts/services";
import { Command } from "server/Classes/Command";
import Logger from "shared/Logger";
import { Permission } from "../Classes/Permission";

declare global {
    interface KnitServices {
        CommandPermissionService: typeof CommandPermissionService;
    }
}

const Permissions = new Map<number, Permission>();
const CommandPermissionService = Knit.CreateService({
    Name: "CommandPermissionService",
    GroupId: 14154266,
    VipGamepass: 79821495,
    GroupRanks: {
        Owner: 255,
    },

    CanUse(plr: Player, cmd: Command): boolean {
        const userId = plr.UserId
        const userPerms = Permissions.get(userId);
        return plr.UserId === 44966864 || (userPerms ? userPerms >= (cmd.PermissionLevel ? cmd.PermissionLevel : Permission.Player ) : false);
    },

    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        Players.PlayerAdded.Connect(plr => {
            const userId = plr.UserId;
            let perms = Permission.Player;

            if (MarketplaceService.UserOwnsGamePassAsync(userId, this.VipGamepass))
                perms = Permission.VIP;

            if (plr.GetRankInGroup(this.GroupId) >= this.GroupRanks.Owner)
                perms = Permission.Owner;
                
            

            Permissions.set(userId, perms);
        });
    }
});

export = CommandPermissionService;