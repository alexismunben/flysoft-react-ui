export const getQueryString = (params: URLSearchParams, newParams: any): string => {
    const queryObject = {
        ...Object.fromEntries(params.entries()),
        ...newParams
    }
    let query = '';
    for (const key in queryObject){
        if(queryObject[key]){
            query += (query !== '' ? '&' : '' )+ key + '=' + queryObject[key]
        }
    }
    return '?'+query;
};
