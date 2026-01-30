export const objectToQueryString = (source: any): string => {
  return Object.keys(source).map( key => source[key] ? `${key}=${source[key]}`: null).filter(p => p).join('&')
}