// scr/api/supplier.ts
import http from '../utils/request.ts'

// 1.封装获取所有供应商信息的 API
export const getSuppliers = () => {
  return http.get('supplier');
}

// 2.通过供应商名称或联系人查询
export const querySuppliers = (sname: string, concat: string) => {
  if (sname != "" && concat == "") {
    return http.get("supplier?sname_like=" + sname);
  } else if (sname == "" && concat != "") {
    return http.get("supplier?concat_like=" + concat);
  } else if (sname != "" && concat != "") {
    return http.get("supplier?sname_like=" + sname + "&concat_like=" + concat);
  }
  return http.get("supplier");
}

// 3.添加供应商
export const addSupplier = (data: any) => {
  return http.post("supplier", data);
}

// 4.修改供应商信息,根据id号更新
export const updateSupplier = (supplier: any) => {
  return http.put("supplier/" + supplier.id, supplier);
}

// 5.删除供应商
export const delSupplier = (id: number) => {
  return http.delete("supplier/" + id);
}
