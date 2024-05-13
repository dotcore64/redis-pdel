--!/usr/bin/env lua

if type(redis.replicate_commands) == "function" and redis.replicate_commands() then -- Redis 3.2+
	local count = 0
	local cursor = "0"
	local keys

	repeat
		cursor, keys = unpack(redis.call("SCAN", cursor, "MATCH", KEYS[1]))
		count = count + #keys
		if #keys > 0 then
			redis.call("DEL", unpack(keys))
		end
	until cursor == "0"

	return count
else
	local keys = redis.call("KEYS", KEYS[1])
	if #keys > 0 then
		redis.call("DEL", unpack(keys))
	end
	return #keys
end
