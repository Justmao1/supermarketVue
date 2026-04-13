// scr/api/bill.ts
import http from '../utils/request.ts'

// 1.封装获取所有订单信息的 API
export const getBills = () => {
  return http.get('bill');
}

// 2.通过商品名称或订单状态查询
export const queryBills = (pname: string, flag: string) => {
  if (pname != "" && flag == "") {
    return http.get("bill?pname_like=" + pname);
  } else if (pname == "" && flag != "") {
    return http.get("bill?flag=" + flag);
  } else if (pname != "" && flag != "") {
    return http.get("bill?pname_like=" + pname + "&flag=" + flag);
  }
  return http.get("bill");
}

// 3.添加订单
export const addBill = (data: any) => {
  return http.post("bill", data);
}

// 4.修改订单信息,根据id号更新
export const updateBill = (bill: any) => {
  return http.put("bill/" + bill.id, bill);
}

// 5.删除订单
export const delBill = (id: number) => {
  return http.delete("bill/" + id);
}