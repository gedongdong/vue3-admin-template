import request from '@/utils/request'

/**
 * @method addVerifyCodeVerify
 * @param {*} data
 */
const addVerifyCodeVerify = (data) => {
  return request.post('/verifyCode/verify', data)
}

export default {
  addVerifyCodeVerify
}
