/**
 *
 * @param time  时间戳字符串
 * @param format  'yyyy-MM-dd h:m:s'
 * @returns {*}
 */
export function formatDate(str, format){
  let timestamp = new Date(str);
  let date = {
    "M+": timestamp.getMonth() + 1,
    "d+": timestamp.getDate(),
    "h+": timestamp.getHours(),
    "m+": timestamp.getMinutes(),
    "s+": timestamp.getSeconds(),
    "q+": Math.floor((timestamp.getMonth() + 3) / 3),
    "S+": timestamp.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (timestamp.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
