export const pick = (obj, keys) => Object.fromEntries(keys.map(k => [k, obj[k]]).filter(([_, v]) => v !== undefined))
export const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))
