import { axiosInstance } from '@/axios'

const getList = (params: { filter?: any }) => {
  return axiosInstance
    .get('/cv', { params })
    .then((response) => response)
    .catch((error) => {
      console.log(`↪️ ~ error:`, error)
      throw new Error('Get list failed')
    })
}
export default {
  getList
}
