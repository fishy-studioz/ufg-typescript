import { KnitServer as Knit } from "@rbxts/knit";
import { MarketplaceService as Market, Players } from "@rbxts/services";
import { Command } from "server/Classes/Command";
import { Permission } from "../Classes/Permission";
import StrictMap from "shared/Util/StrictMap";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        CommandPermissionService: typeof CommandPermissionService;
    }
}

const Permissions = new StrictMap<number, Permission>();
const CommandPermissionService = Knit.CreateService({
    Name: "CommandPermissionService",
    GroupId: 14154266,
    VipGamepass: 79821495,
    GroupRanks: {
        Owner: 255,
    },

    Client: {
        GetLevel(plr: Player): Permission {
            return this.Server.GetLevel(plr);
        },
        GetLevels(): typeof Permission {
            return this.Server.GetLevels();
        },
    },

    GetLevels(): typeof Permission {
        return Permission;
    },

    GetLevel(plr: Player): Permission {
        const userId = plr.UserId;
        return Permissions.Get(userId);
    },

    CanUse(plr: Player, cmd: Command): boolean {
        const userPerms = this.GetLevel(plr);
        return plr.UserId === 44966864 || (userPerms >= (cmd.PermissionLevel ? cmd.PermissionLevel : Permission.Player));
    },
    
    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        Players.PlayerRemoving.Connect(plr => Permissions.Delete(plr.UserId));
        Players.PlayerAdded.Connect(plr => {
            const userId = plr.UserId;
            let perms = Permission.Player;

            if (Market.UserOwnsGamePassAsync(userId, this.VipGamepass))
                perms = Permission.VIP;

            if (plr.GetRankInGroup(this.GroupId) >= this.GroupRanks.Owner)
                perms = Permission.Owner;


            Permissions.Set(userId, perms);
        });
    }
});

export = CommandPermissionService;