export const consumeViewLua = `
local data = redis.call("GET", KEYS[1])
if not data then return {err="NOT_FOUND"} end

local obj = cjson.decode(data)

-- TTL check
if obj.expires_at ~= cjson.null and tonumber(ARGV[1]) >= obj.expires_at then
  return {err="EXPIRED"}
end

-- View limit check
if obj.max_views ~= cjson.null and obj.views >= obj.max_views then
  return {err="LIMIT"}
end

obj.views = obj.views + 1
redis.call("SET", KEYS[1], cjson.encode(obj))

return cjson.encode(obj)
`;
