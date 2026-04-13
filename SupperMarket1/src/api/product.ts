// scr/api/product.ts
import request from '../utils/request.ts'
// 封装获取所有商品信息的 API
export const getProducts = () => {
  return request.get('product');
}