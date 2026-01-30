export const queryStringToObject = (params: string ) => {
    return params
    .trim()
      .split('&')
      .filter(p => p.trim() !== '')
      .reduce((obj, value) => {
        const paramArr = value.split('=');

        return {
          ...obj, 
          [paramArr[0]]: paramArr[1]
        }
      }, {})    
}