-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Signal = _knit.Signal
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local Runtime = _services.RunService
local Logger = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Logger").default
local LagIdentificationService = Knit.CreateService({
	Name = "LagIdentificationService",
	StartedLagging = Signal.new(),
	StoppedLagging = Signal.new(),
	Client = {
		StartedLagging = RemoteSignal.new(),
		StoppedLagging = RemoteSignal.new(),
	},
	KnitInit = function(self)
		Logger:ComponentActive(script.Name)
		self.StartedLagging:Connect(function(plr)
			return print(tostring(plr) .. " is lagging")
		end)
		self.StoppedLagging:Connect(function(plr)
			return print(tostring(plr) .. " is no longer lagging")
		end)
		local lastPositions = {}
		local lagging = {}
		local _exp = Players:GetPlayers()
		local _arg0 = function(plr)
			local _name = plr.Name
			lagging[_name] = false
			return lagging
		end
		for _k, _v in ipairs(_exp) do
			_arg0(_v, _k - 1, _exp)
		end
		Runtime.PostSimulation:Connect(function(dt)
			for _, plr in ipairs(Players:GetPlayers()) do
				local _name = plr.Name
				local _position = plr.Character.PrimaryPart.Position
				lastPositions[_name] = _position
				local _name_1 = plr.Name
				local lastPos = lastPositions[_name_1]
				local _curPos = plr.Character
				if _curPos ~= nil then
					_curPos = _curPos.PrimaryPart
					if _curPos ~= nil then
						_curPos = _curPos.Position
					end
				end
				local curPos = _curPos
				if lastPos and curPos then
					local dist = (lastPos - curPos).Magnitude
					local _name_2 = plr.Name
					local isLagging = lagging[_name_2]
					if dist > 3 and not isLagging then
						local _name_3 = plr.Name
						lagging[_name_3] = true
						self.StartedLagging:Fire(plr)
					elseif dist <= 3 and isLagging then
						local _name_3 = plr.Name
						lagging[_name_3] = false
						self.StartedLagging:Fire(plr)
					end
				end
			end
		end)
	end,
})
return LagIdentificationService
