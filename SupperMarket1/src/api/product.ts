// scr/api/product.ts
import http from '../utils/request.ts'

// 1.封装获取所有商品信息的 API
export const getProducts = () => {
  return http.get('product');
}

// 2.通过商品名称或商品状态查询
export const queryProducts = (pname: string, status: string) => {
  if (pname != "" && status == "") { //只查商品名
    return http.get("product?pname_like=" + pname);
  } else if (pname == "" && status != "") { //只查状态
    return http.get("product?status=" + status);
  } else if (pname != "" && status != "") { //同时查
    return http.get("product?pname_like=" + pname + "&status=" + status);
  }
  ////查所有商品
  return http.get("product");
}

// 3.添加商品
export const addProduct = (data: any) => {
  return http.post("product", data);
}

// 4.修改商品信息,根据id号更新
export const updateProduct = (product: any) => {
  return http.put("product/" + product.id, product);
}

// 5.删除商品
export const delProduct = (id: number) => {
  return http.delete("product/" + id);
}