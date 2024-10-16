import { TOKEN } from '@/constants'
import axios from 'axios'
import { getAccessToken, getRefreshToken, goToLoginPage } from '@/utils'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const refreshToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return
  try {
    const response = await axiosInstance.post('/auth/refresh-token', {
      refresh_token: refreshToken
    })
    const { access_token } = response.data
    localStorage.setItem(TOKEN, access_token)
    return access_token
  } catch (error) {
    console.log(`↪️ ~ error:`, error)
    throw new Error('Refresh token failed')
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(`↪️ ~ error:`, error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const { config, status } = response
    // TODO: 401: Unauthorized
    if (status === 401) {
      return refreshToken().then((token) => {
        config.headers['Authorization'] = `Bearer ${token}`
        return axiosInstance(config)
      })
    }
    return response.data
  },
  (error) => {
    console.log(`↪️ ~ error:`, error)
    goToLoginPage()
    return Promise.reject(error)
  }
)

export default axiosInstance
