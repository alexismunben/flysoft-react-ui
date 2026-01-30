import type { PaginationInterface } from "../interfaces";


export const promiseMapper = <T, K> (promise: Promise<any>, mapperFunction: (object: T) => K ): Promise<K | K[] | PaginationInterface<K>> => {
    return new Promise((resolve, reject) => {
        promise.then( res => {
            if(Array.isArray(res)){
                resolve(res.map((i: T) => mapperFunction(i)))
            } else if( res.list !== undefined && res.total !== undefined && res.page !== undefined && res.pages !== undefined && res.limit !== undefined) {
                resolve({
                    ...res,
                    list: res.list.map((i: T) => mapperFunction(i))
                })
            } else if( res.lista !== undefined && res.total !== undefined && res.pagina !== undefined && res.paginas !== undefined && res.mostrar !== undefined ) {
                resolve({
                    total: res.total,
                    list: res.lista.map((i: T) => mapperFunction(i)),
                    limit: res.mostrar,
                    page: res.pagina,
                    pages: res.paginas,
                })
            } else {
                resolve(mapperFunction(res));
            }
        }).catch(error => reject(error));
    });
}
