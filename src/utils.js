import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const pick = (obj, keys) => Object.fromEntries(keys.map(k => [k, obj[k]]).filter(([, v]) => v !== undefined))
export const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))