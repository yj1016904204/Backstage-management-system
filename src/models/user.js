import requset from '@/services/http'
import { GET_USER_INFO, GET_STATISTICS_DATA, GET_USER, ADD_USER } from '@/config/url'
const models = {
  getUserInfo(obj) {
    return requset.get(GET_USER_INFO, {
      params: obj
    })
  },
  getUserStatistics() {
    return requset.get(GET_STATISTICS_DATA)
  },
  deleteUser(id) {
    return requset.delete(GET_USER + id)
  },
  getUserId(id) {
    return requset.get(GET_USER + id)
  },
  editUser(id, obj) {
    return requset.put(GET_USER + id, obj)
  },
  addListUser(obj) {
    return requset.post(ADD_USER, obj)
  }
}
export default models