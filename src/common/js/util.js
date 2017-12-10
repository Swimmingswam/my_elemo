/**
 *解析url参数
 *@example ?id=123456&a=b
 *@return Object {id:123456,a:b}
 */
export function urlParse () {
  let url = window.location.search  // ?id=123456&a=b
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)  // [?id=123456,&a=b]
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=') // [id,123456]
      let key = decodeURIComponent(tempArr[0]) // id
      let val = decodeURIComponent(tempArr[1]) // 123456
      obj[key] = val // {id:123456,a:b}
    })
  }
  return obj
}
