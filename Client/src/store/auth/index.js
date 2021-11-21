import * as types from './types';
import * as actions from './actions';

const initialState = {
    loading: false,
    verifying: false,
    user: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {

        /* LOGIN */
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case types.LOGIN_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.LOGOUT:
            return {
                ...state,
                user: null
            };

        /* VERIFY */
        case types.VERIFY_REQUEST:
            return {
                ...state,
                verifying: true
            };
        case types.VERIFY_SUCCESS:
            return {
                ...state,
                verifying: false
            };
        case types.VERIFY_FAILURE:
            return {
                user: null,
                verifying: false,
                error: action.payload
            };
        default:
            return state;
    };
};

export { actions };
export default reducer;