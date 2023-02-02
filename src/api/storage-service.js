import request from '@/utils/request'

/**
 * @method addStorageStorageList
 * @param {*} data
 */
const addStorageStorageList = (data) => {
  return request.post('/storage/storageList', data)
}
/**
 * @method addStorageSorderScodeList
 * @param {*} data
 */
const addStorageSorderScodeList = (data) => {
  return request.post('/storage/sorderScodeList', data)
}

export default {
  addStorageStorageList,
  addStorageSorderScodeList
}
