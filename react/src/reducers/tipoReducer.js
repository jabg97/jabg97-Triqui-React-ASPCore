import * as types from '../actions/actionTypes';

const initialState = {
    list: [],
};

export default function tipoReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_TIPOS_REQUEST:
            return {
                ...state,
                list: [],
            };
        case types.GET_TIPOS_SUCCESS:
            return {
                ...state,
                list: action.tipos,
            };
        default:
            return state;
    }
}
