import { Apis } from '../APIs'
import httpCommon from "../http/http.common";
import htttpLogin from '../http/http.login'

class LoginService {
  login(data) {
    return htttpLogin.post(`${Apis.Login_login}`, data)
  }
  userData(data) {
    return httpCommon.get(`${Apis.Login_userData}/${data.id}`)
  }
  logoutApi(data) {
    return htttpLogin.post(`${Apis.Login_logoutApi}?refreshToken=${data}`)
  }
}
export default new LoginService()
