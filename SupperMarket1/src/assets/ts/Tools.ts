// src/assets/js/Tool.ts
export function getDate() {//获取日期
    //日期对象
    let dd = new Date();
    //年份
    let year = dd.getFullYear();
    //月份数加1转成字符串
    let month = dd.getMonth() + 1 + '';
    let temp1 = dd.getMonth() + 1;//数值
    month = temp1 > 9 ? month : '0' + month;
    //日份数
    let date = dd.getDate()+'';
    let temp2 = dd.getDate();
    date = temp2 > 9 ? date : '0' + date;
    //时
    let hour = dd.getHours()+'';
    let temp3 = dd.getHours();
    hour = temp3 > 9 ? hour : '0' + hour;
    //分
    let minute = dd.getMinutes()+'';
    let temp4 = dd.getMinutes();
    minute = temp4 > 9 ? minute : '0' + minute;
    //秒
    let second = dd.getSeconds()+'';
    let temp5 = dd.getSeconds();    
    second = temp5 > 9 ? second : '0' + second;
    ////星期数,1-6,0
    let wk = dd.getDay();
    let arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let week = " " + arr[wk];
    let str = year + "年 " + month + "月 " + date + "日  ";
    str += hour + ":" + minute + ":" + second + week;
    //2026年04月13日  09:45:20 星期一
    return str;
}
//根据日间返回提示
export function getTips() {//获取提示
    //日期对象
    let dd = new Date();
    //小时数
    let hour = dd.getHours();
    let temp = "您好啊"
    if (hour >= 19) {
        temp = "晚上好"
    } else if (hour >= 18) {
        temp = "傍晚好"
    } else if (hour >= 15) {
        temp = "下午好"
    } else if (hour >= 12) {
        temp = "中午好"
    } else if (hour >= 9) {
        temp = "上午好"
    } else if (hour >= 6) {
        temp = "早上好"
    } else {
        temp = "凌晨好"
    }
    return temp + "：";
}