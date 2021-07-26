import axios from 'axios'


axios.interceptors.request.use((config) => {
  let jwt = localStorage.getItem("jwt")
  if (jwt) {
    config.headers.Authorization = jwt
  }
  return config
})

axios.interceptors.response.use((ret) => {

  if (ret.data.context && ret.data.context.jwt) {
    localStorage.setItem("jwt", ret.data.context.jwt)
  }
  return ret.data || ret
})


export default axios