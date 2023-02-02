import request from '@/utils/request'

/**
 * @method addWarehouseWarehouseList
 * @param {*} data
 */
const addWarehouseWarehouseList = (data) => {
  return request.post('/warehouse/warehouseList', data)
}

export default {
  addWarehouseWarehouseList
}
