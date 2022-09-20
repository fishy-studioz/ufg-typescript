-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TypeScript_Include"):WaitForChild("RuntimeLib"))
local StringBuilder = TS.import(script, game:GetService("ReplicatedStorage"), "TypeScript", "Util", "StringBuilder").StringBuilder
local function CharAt(n, s)
	local _arg0 = n + 1
	local _arg1 = n + 1
	return string.sub(s, _arg0, _arg1)
end
local function IsUpper(s)
	return string.upper(s) == s
end
local function Spacify(text, preserveAcronyms)
	if preserveAcronyms == nil then
		preserveAcronyms = false
	end
	if text == "" then
		return text
	end
	local newText = StringBuilder.new(CharAt(0, text))
	do
		local i = 1
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i += 1
			else
				_shouldIncrement = true
			end
			if not (i < #text) then
				break
			end
			if IsUpper(CharAt(i, text)) then
				if (CharAt(i - 1, text) ~= " " and not IsUpper(CharAt(i - 1, text))) or (preserveAcronyms and (IsUpper(CharAt(i - 1, text)) and (i < #text - 1 and IsUpper(CharAt(i + 1, text))))) then
					newText:Append(" ")
				end
			end
			newText:Append(CharAt(i, text))
		end
	end
	return newText:ToString()
end
return {
	Spacify = Spacify,
}
