import * as types from './actionTypes';
import { httpClient } from '../utils';

export function getTipos() {
    return async dispatch => {
        dispatch(getTiposPending());
        const response = await httpClient.get('api/TiposIdentificacions');
        console.log(response);
        if (response.status == 200){
            dispatch(getTiposSuccess(response.result));
        }       
    };
}
function getTiposPending() {
    return {
        type: types.GET_TIPOS_REQUEST,
    };
}

function getTiposSuccess(tipos) {
    return {
        type: types.GET_TIPOS_SUCCESS,
        tipos,
    };
}
