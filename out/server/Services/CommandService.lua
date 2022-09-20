-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Messaging = _services.MessagingService
local Players = _services.Players
local ReplicatedFirst = _services.ReplicatedFirst
local ReplicatedStorage = _services.ReplicatedStorage
local Runtime = _services.RunService
local Permission = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "Permission").Permission
local Command = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "Command").Command
local BanService = TS.import(script, TS.getModule(script, "@rbxts", "ban-service").src)
local WaitFor = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "WaitFor").default
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local sendConsoleMsg = WaitFor(ReplicatedStorage, "SendConsoleMsg")
local reply = function(plr, msg)
	return sendConsoleMsg:FireClient(plr, msg)
end
local discord
local CommandService = Knit.CreateService({
	Name = "CommandService",
	Commands = {
		ping = Command.new("ping", Permission.Player, { "pingcheck", "pong" }, function(plr)
			return reply(plr, "Pong!")
		end),
		version = Command.new("version", Permission.Player, { "ver", "vers", "v", "gameversion" }, function(plr)
			local version = WaitFor(ReplicatedFirst, "GameVersion")
			reply(plr, version.Value)
		end),
		kick = Command.new("kick", Permission.Developer, { "kickout", "remove", "bye" }, function(plr, args)
			local _condition = args[1]
			if _condition == nil then
				_condition = ""
			end
			local target = _condition
			table.remove(args, 1)
			local reason = table.concat(args, " ")
			reason = if #args == 0 then "You have been kicked by " .. (plr.Name .. ".") else reason
			local targetPlayer = Players:FindFirstChild(target)
			if not targetPlayer then
				return reply(plr, "Provided no target to kick.")
			end
			targetPlayer:Kick(reason)
			reply(plr, "Successfully kicked " .. (targetPlayer.Name .. "."))
			discord:Log(plr, targetPlayer.Name .. (" was kicked for " .. (reason .. ".")), "Moderation")
		end),
		ban = Command.new("ban", Permission.Developer, { "banish", "pban", "permban" }, function(plr, args)
			local _condition = args[1]
			if _condition == nil then
				_condition = ""
			end
			local target = _condition
			table.remove(args, 1)
			local reason = table.concat(args, " ")
			reason = if #args == 0 then "You have been banned by " .. (plr.Name .. ".") else reason
			local targetPlayer = Players:FindFirstChild(target)
			if not targetPlayer then
				return reply(plr, "Provided no target to ban.")
			end
			BanService.Ban(targetPlayer, reason)
			reply(plr, "Successfully banned " .. (targetPlayer.Name .. "."))
			discord:Log(plr, targetPlayer.Name .. (" was banned for " .. (reason .. ".")), "Moderation")
		end),
		notify = Command.new("notify", Permission.Developer, { "announce", "broadcast", "notif" }, function(plr, args)
			local msg = table.concat(args, " ")
			if not (msg ~= "" and msg) or msg == "" then
				return reply(plr, "Please input a valid message to broadcast.")
			end
			local success, err = pcall(function()
				return Messaging:PublishAsync("DevNotify", msg)
			end)
			if success then
				reply(plr, "Successfully sent notification.")
			else
				reply(plr, "Failed to send notification: " .. tostring(err))
			end
		end),
	},
	KnitStart = function(self)
		Logger:ComponentActive(script.Name)
		discord = Knit.GetService("DiscordLogService")
		local cmdPerms = Knit.GetService("CommandPermissionService")
		local prefix = "."
		Players.PlayerAdded:Connect(function(plr)
			return plr.Chatted:Connect(function(text)
				local msg = text
				local args = string.split(msg, " ")
				local cmdName = string.split(args[1], prefix)[2]
				table.remove(args, 1)
				local cmd = self:FindCommand(cmdName)
				local canUse = if cmd then cmdPerms:CanUse(plr, cmd) else false
				if Runtime:IsStudio() and (not canUse and cmd) then
					canUse = true
				end
				if cmd and canUse then
					discord:Log(plr, "Running command: " .. cmd.Name .. (if #args > 0 then " with args [" .. table.concat(args, ", ") .. "]" else ""), "Command Executed")
					cmd:Run(plr, args)
				end
			end)
		end)
	end,
	FindCommand = function(self, cmdName)
		local cmd = self.Commands[cmdName]
		if not cmd then
			local _commands = self.Commands
			local _arg0 = function(c)
				if not (table.find(c.Aliases, cmdName) ~= nil) then
					return nil
				end
				cmd = c
			end
			for _k, _v in pairs(_commands) do
				_arg0(_v, _k, _commands)
			end
		end
		return cmd
	end,
})
return CommandService
