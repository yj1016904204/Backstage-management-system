//公共请求数据处理及请求数据
import requset from '@/services/http'
import { NORMAL_LOGIN, CAPTCHA_LOGIN, MOBILE_SEND, MOBAIL_LOGIN, JWT_PRE_CHECK, GET_ADMIN_INFO } from '@/config/url'


const models = {
  normalLogin(obj) {
    return requset.post(NORMAL_LOGIN, obj)
  },
  captchaLogin(obj) {
    return requset.post(CAPTCHA_LOGIN, obj)
  },
  mobileSend(obj) {
    return requset.post(MOBILE_SEND, obj)
  },
  mobileLogin(obj) {
    return requset.post(MOBAIL_LOGIN, obj)
  },
  jwtCheck() {
    return requset.post(JWT_PRE_CHECK)
  },
  getAdminInfo() {
    return requset.get(GET_ADMIN_INFO)
  }
}
export default models