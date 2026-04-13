// scr/api/supplier.ts
import request from '../utils/request.ts'
// 1.封装获取所有供应商信息的 API
export const getSuppliers = () => {
  return request.get('supplier');
}
