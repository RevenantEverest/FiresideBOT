import * as types from './types';
import * as actions from './actions';

const initialState = {
    loading: false,
    user: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state;
    };
};

export { actions };
export default reducer;