-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Messaging = _services.MessagingService
local Players = _services.Players
local ReplicatedFirst = _services.ReplicatedFirst
local ReplicatedStorage = _services.ReplicatedStorage
local Permission = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "Permission").Permission
local Command = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "Command").Command
local BanService = TS.import(script, TS.getModule(script, "@rbxts", "ban-service").src)
local WaitFor = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "WaitFor").default
local sendConsoleMsg = WaitFor(ReplicatedStorage, "SendConsoleMsg")
local reply = function(plr, msg)
	return sendConsoleMsg:FireClient(plr, msg)
end
local function GetCommandList(discord)
	return { { "ping", Command.new("ping", Permission.Player, { "pingcheck", "pong" }, function(plr)
		return reply(plr, "Pong!")
	end) }, { "version", Command.new("version", Permission.Player, { "ver", "vers", "v", "gameversion" }, function(plr)
		local version = WaitFor(ReplicatedFirst, "GameVersion")
		reply(plr, version.Value)
	end) }, { "kick", Command.new("kick", Permission.Developer, { "kickout", "remove", "bye" }, function(plr, args)
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
	end) }, { "ban", Command.new("ban", Permission.Developer, { "banish", "pban", "permban" }, function(plr, args)
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
	end) }, { "unban", Command.new("unban", Permission.Developer, { "unbanish", "unpban", "unpermban" }, function(plr, _param)
		local targetId = _param[1]
		local _condition = not (targetId ~= "" and targetId)
		if not _condition then
			local _value = tonumber(targetId)
			_condition = not (_value ~= 0 and (_value == _value and _value))
		end
		if _condition then
			return reply(plr, "Provided no target to unban.")
		end
		BanService.Unban(tonumber(targetId))
		reply(plr, "Successfully unbanned " .. (targetId .. "."))
		discord:Log(plr, targetId .. " was unbanned.", "Moderation")
	end) }, { "notify", Command.new("notify", Permission.Developer, { "announce", "broadcast", "notif" }, function(plr, args)
		local msg = table.concat(args, " ")
		if not (msg ~= "" and msg) or msg == "" then
			return reply(plr, "Please input a valid message to broadcast.")
		end
		local success, err = pcall(function()
			return Messaging:PublishAsync("DevNotify", msg)
		end)
		reply(plr, if success then "Successfully sent notification." else "Failed to send notification: " .. tostring(err))
	end) } }
end
return {
	GetCommandList = GetCommandList,
}
