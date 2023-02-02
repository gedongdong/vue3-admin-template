import request from '@/utils/request'

/**
 * @method addLogin
 * @param {*} data
 */
const addLogin = (data) => {
  return request.post('/login', data)
}
/**
 * @method getLoginUserInfo
 * @param {*} data
 */
const getLoginUserInfo = (data) => {
  return request.get('/login/userInfo', data)
}

export default {
  addLogin,
  getLoginUserInfo
}
