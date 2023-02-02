import Cookies from 'js-cookie'

export const getCookies = (key, defaultValue = null) =>
  Cookies.get(key) ? JSON.parse(Cookies.get(key)) : defaultValue

export const setCookies = (key, value) =>
  Cookies.set(key, JSON.stringify(value))

export const removeCookies = (key) => Cookies.remove(key)
