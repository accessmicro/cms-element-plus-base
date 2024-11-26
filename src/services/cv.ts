import { axiosInstance } from '@/axios'

const getList = (params: { filter?: any } = {}) => {
  return axiosInstance
    .get('/cv', { params })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error)
    })
}
export default {
  getList
}
