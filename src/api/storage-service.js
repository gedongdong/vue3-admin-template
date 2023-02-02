import request from '@/utils/request'

/**
 * @method addStorageCodeSearch
 * @param {*} data
 */
const addStorageCodeSearch = (data) => {
  return request.post('/storage/code_search', data)
}
/**
 * @method addStorageSorderScodeList
 * @param {*} data
 */
const addStorageSorderScodeList = (data) => {
  return request.post('/storage/sorderScodeList', data)
}

export default {
  addStorageCodeSearch,
  addStorageSorderScodeList
}
