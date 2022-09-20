-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Signal = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).Signal
local TimerHandle
do
	TimerHandle = setmetatable({}, {
		__tostring = function()
			return "TimerHandle"
		end,
	})
	TimerHandle.__index = TimerHandle
	function TimerHandle.new(...)
		local self = setmetatable({}, TimerHandle)
		return self:constructor(...) or self
	end
	function TimerHandle:constructor()
		self.Active = true
	end
	function TimerHandle:Disable()
		self.Active = false
	end
end
local Timer
do
	Timer = setmetatable({}, {
		__tostring = function()
			return "Timer"
		end,
	})
	Timer.__index = Timer
	function Timer.new(...)
		local self = setmetatable({}, Timer)
		return self:constructor(...) or self
	end
	function Timer:constructor(increment)
		if increment == nil then
			increment = 1
		end
		self.increment = increment
		self.timeRemaining = 0
		self.timeScale = 1
		self.Count = Signal.new()
		self.OnSet = Signal.new()
		self.Finished = Signal.new()
	end
	function Timer:SetTimescale(multiplier)
		self.timeScale = multiplier
	end
	function Timer:Set(time)
		self.timeRemaining = time
		self.OnSet:Fire(time)
	end
	function Timer:Start()
		local handle = TimerHandle.new()
		task.spawn(function()
			while self.timeRemaining > 0 do
				if not handle.Active then
					break
				end
				task.wait(1 / self.timeScale)
				self.timeRemaining -= self.increment
				self.Count:Fire(self.timeRemaining)
			end
			self.Finished:Fire()
		end)
		return handle
	end
	function Timer:Stop(handle)
		handle:Disable()
	end
end
return {
	TimerHandle = TimerHandle,
	Timer = Timer,
}
