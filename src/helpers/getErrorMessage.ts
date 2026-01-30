import {AxiosError} from 'axios';

export const getErrorMessage = (error: any): string => {
    console.log('ERR', error)
    if(error instanceof AxiosError){
        const data = error.response?.data || {};
        if(data.message){
            return data.message;
        } else if ( data.errors ) {
            return Object.values(data.errors).join(', ');
        }
    }
    return 'Ha ocurrido un error';
}
