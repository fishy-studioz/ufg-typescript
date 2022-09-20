-- Compiled with roblox-ts v1.3.3
local StringBuilder
do
	StringBuilder = setmetatable({}, {
		__tostring = function()
			return "StringBuilder"
		end,
	})
	StringBuilder.__index = StringBuilder
	function StringBuilder.new(...)
		local self = setmetatable({}, StringBuilder)
		return self:constructor(...) or self
	end
	function StringBuilder:constructor(Content)
		if Content == nil then
			Content = ""
		end
		self.Content = Content
	end
	function StringBuilder:Append(...)
		local text = { ... }
		for _, s in ipairs(text) do
			self.Content ..= s
		end
		return self
	end
	function StringBuilder:AppendLine(...)
		local text = { ... }
		for _, s in ipairs(text) do
			self.Content ..= s
		end
		return self:Append("\n")
	end
	function StringBuilder:ToString()
		return self.Content
	end
end
return {
	StringBuilder = StringBuilder,
}
