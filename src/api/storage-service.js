import request from '@/utils/request'

/**
 * @method addStorageCodeSearch
 * @param {*} data
 */
const addStorageCodeSearch = (data) => {
  return request.post('/storage/code_search', data)
}

export default {
  addStorageCodeSearch
}
