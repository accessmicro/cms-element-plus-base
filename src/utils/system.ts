import { REFRESH_TOKEN, TOKEN } from '@/constants'
import route from '@/router'

const getAccessToken = () => {
  return localStorage.getItem(TOKEN)
}

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}

const clearStorage = () => localStorage.clear()

const goToLoginPage = () => {
  clearStorage()
  route.push({
    name: 'login',
    query: { redirect: route.currentRoute.value.fullPath }
  })
}

export { clearStorage, getAccessToken, getRefreshToken, goToLoginPage }
