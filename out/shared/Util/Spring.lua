-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local IsNaN = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "IsNaN").default
local Spring
do
	Spring = setmetatable({}, {
		__tostring = function()
			return "Spring"
		end,
	})
	Spring.__index = Spring
	function Spring.new(...)
		local self = setmetatable({}, Spring)
		return self:constructor(...) or self
	end
	function Spring:constructor(Mass, Force, Damping, Speed)
		if Mass == nil then
			Mass = 5
		end
		if Force == nil then
			Force = 50
		end
		if Damping == nil then
			Damping = 4
		end
		if Speed == nil then
			Speed = 4
		end
		self.Mass = Mass
		self.Force = Force
		self.Damping = Damping
		self.Speed = Speed
		self.Target = Vector3.new()
		self.Position = Vector3.new()
		self.Velocity = Vector3.new()
	end
	function Spring:Shove(force)
		local x = force.X
		local y = force.Y
		local z = force.Z
		if IsNaN(x) or (x == math.huge or x == -math.huge) then
			x = 0
		end
		if IsNaN(y) or (y == math.huge or y == -math.huge) then
			y = 0
		end
		if IsNaN(z) or (z == math.huge or z == -math.huge) then
			z = 0
		end
		local _velocity = self.Velocity
		local _vector3 = Vector3.new(x, y, z)
		self.Velocity = _velocity + _vector3
	end
	function Spring:Update(dt)
		local scaledDt = math.min(dt, 1) * self.Speed / Spring.Iterations
		do
			local i = 0
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not (i < Spring.Iterations) then
					break
				end
				local _target = self.Target
				local _position = self.Position
				local force = _target - _position
				local _force = self.Force
				local _exp = force * _force
				local _mass = self.Mass
				local accel = _exp / _mass
				local _accel = accel
				local _velocity = self.Velocity
				local _damping = self.Damping
				accel = _accel - (_velocity * _damping)
				local _velocity_1 = self.Velocity
				local _arg0 = accel * scaledDt
				self.Velocity = _velocity_1 + _arg0
				local _position_1 = self.Position
				local _arg0_1 = self.Velocity * scaledDt
				self.Position = _position_1 + _arg0_1
			end
		end
		return self.Position
	end
	Spring.Iterations = 8
end
return {
	default = Spring,
}
