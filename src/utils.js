import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const pick = (obj, keys) => Object.fromEntries(keys.map(k => [k, obj[k]]).filter(([, v]) => v !== undefined))
export const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))

export const getLocal = (key) => {
    try {
        let item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export const setLocal = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.log(error)
        return null
    }
}