// scr/api/bill.ts
import request from '../utils/request.ts'
// 封装获取所有订单信息的 API
export const getBills = () => {
  return request.get('bill');
}