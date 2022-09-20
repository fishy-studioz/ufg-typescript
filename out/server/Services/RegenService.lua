-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local Runtime = _services.RunService
local RegenService = Knit.CreateService({
	Name = "RegenService",
	KnitInit = function(self)
		Players.PlayerAdded:Connect(function(plr)
			return plr.CharacterAdded:Connect(function(char)
				local humanoid = char:WaitForChild("Humanoid")
				local regenScript = char:WaitForChild("Health")
				regenScript:Destroy()
				local maxHealth = humanoid.MaxHealth
				local damagedRecently = false
				local regenning = false
				local lastHealth = humanoid.Health
				humanoid.HealthChanged:Connect(function(hp)
					damagedRecently = hp < lastHealth
					if damagedRecently or lastHealth == maxHealth then
						task.delay(4.5, function()
							damagedRecently = false
							return damagedRecently
						end)
					end
					lastHealth = hp
				end)
				Runtime.Heartbeat:Connect(function(dt)
					regenning = false
					if humanoid.Health == maxHealth then
						damagedRecently = false
						return nil
					end
					if not damagedRecently then
						regenning = true
						humanoid.Health += (1.5 * dt)
						-- lastHealth = humanoid.Health;
					end
				end)
			end)
		end)
	end,
})
return RegenService
