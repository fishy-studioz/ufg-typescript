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

const Permissions = new Map<number, Permission>();
const CommandPermissionService = Knit.CreateService({
    Name: "CommandPermissionService",
    GroupId: 5684670,
    GroupRanks: {
        Owner: 255,
        Developer: 254
    },

    Client: {
        GetLevel(plr: Player): Permission | undefined {
            return this.Server.GetLevel(plr);
        },
        GetLevels(): typeof Permission {
            return this.Server.GetLevels();
        },
    },

    GetLevels(): typeof Permission {
        return Permission;
    },

    GetLevel(plr: Player): Permission | undefined {
        const userId = plr.UserId;
        return Permissions.get(userId);
    },

    CanUse(plr: Player, cmd: Command): boolean {
        const userPerms = this.GetLevel(plr)!;
        return plr.UserId === 44966864 || plr.UserId === 1120246022 || (userPerms >= (cmd.PermissionLevel ? cmd.PermissionLevel : Permission.Player));
    },
    
    KnitInit(): void {
        Logger.ComponentActive(script.Name);
        Players.PlayerRemoving.Connect(plr => Permissions.delete(plr.UserId));
        Players.PlayerAdded.Connect(plr => {
            const setP = (id: number, p: Permission) => Permissions.set(id, p);

            const userId = plr.UserId;
            let perms = Permission.Player;
            setP(userId, perms);
            
            // if (Market.UserOwnsGamePassAsync(userId, this.VipGamepass))
            //     perms = Permission.VIP; setP(userId, perms);
            
            const gRank = plr.GetRankInGroup(this.GroupId);
            if (gRank >= this.GroupRanks.Owner)
                perms = Permission.Owner; setP(userId, perms);

            if (gRank >= this.GroupRanks.Developer)
                perms = Permission.Developer; setP(userId, perms);
        });
    }
});

export = CommandPermissionService;