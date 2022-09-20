-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local Permission = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "Permission").Permission
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local Permissions = {}
local CommandPermissionService = Knit.CreateService({
	Name = "CommandPermissionService",
	GroupId = 5684670,
	GroupRanks = {
		Owner = 255,
		Developer = 254,
	},
	Client = {
		GetLevel = function(self, plr)
			return self.Server:GetLevel(plr)
		end,
		GetLevels = function(self)
			return self.Server:GetLevels()
		end,
	},
	GetLevels = function(self)
		return Permission
	end,
	GetLevel = function(self, plr)
		local userId = plr.UserId
		return Permissions[userId]
	end,
	CanUse = function(self, plr, cmd)
		local userPerms = self:GetLevel(plr)
		local _condition = plr.UserId == 44966864 or plr.UserId == 1120246022
		if not _condition then
			local _value = cmd.PermissionLevel
			_condition = (userPerms >= (if _value ~= 0 and (_value == _value and _value) then cmd.PermissionLevel else Permission.Player))
		end
		return _condition
	end,
	KnitInit = function(self)
		Logger:ComponentActive(script.Name)
		Players.PlayerRemoving:Connect(function(plr)
			local _userId = plr.UserId
			-- ▼ Map.delete ▼
			local _valueExisted = Permissions[_userId] ~= nil
			Permissions[_userId] = nil
			-- ▲ Map.delete ▲
			return _valueExisted
		end)
		Players.PlayerAdded:Connect(function(plr)
			local setP = function(id, p)
				Permissions[id] = p
				return Permissions
			end
			local userId = plr.UserId
			local perms = Permission.Player
			setP(userId, perms)
			-- if (Market.UserOwnsGamePassAsync(userId, this.VipGamepass))
			-- perms = Permission.VIP; setP(userId, perms);
			local gRank = plr:GetRankInGroup(self.GroupId)
			if gRank >= self.GroupRanks.Owner then
				perms = Permission.Owner
			end
			setP(userId, perms)
			if gRank >= self.GroupRanks.Developer then
				perms = Permission.Developer
			end
			setP(userId, perms)
		end)
	end,
})
return CommandPermissionService
