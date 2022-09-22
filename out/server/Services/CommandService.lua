-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local Runtime = _services.RunService
local GetCommandList = TS.import(script, game:GetService("ServerScriptService"), "TypeScript", "Classes", "CommandList").GetCommandList
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local CommandService = Knit.CreateService({
	Name = "CommandService",
	KnitStart = function(self)
		Logger:ComponentActive(script.Name)
		local discord = Knit.GetService("DiscordLogService")
		local cmdPerms = Knit.GetService("CommandPermissionService")
		local commandList = GetCommandList(discord)
		local _map = {}
		for _, _v in ipairs(commandList) do
			_map[_v[1]] = _v[2]
		end
		local commands = _map
		local prefix = "."
		Players.PlayerAdded:Connect(function(plr)
			return plr.Chatted:Connect(function(text)
				local msg = text
				local args = string.split(msg, " ")
				local cmdName = string.split(args[1], prefix)[2]
				table.remove(args, 1)
				local cmd = self:FindCommand(commands, cmdName)
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
	FindCommand = function(self, commands, cmdName)
		local cmd = commands[cmdName]
		if not cmd then
			local _arg0 = function(c)
				if not (table.find(c.Aliases, cmdName) ~= nil) then
					return nil
				end
				cmd = c
			end
			for _k, _v in pairs(commands) do
				_arg0(_v, _k, commands)
			end
		end
		return cmd
	end,
})
return CommandService
