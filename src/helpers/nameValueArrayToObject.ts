import type { NameValueInterface } from "../interfaces"


export const nameValueArrayToObject = <T,> (nameValueArray: Array<NameValueInterface<T>>) => {
  return nameValueArray.reduce((obj, value) => ({...obj, [value.name]: value.value}), {})  
}