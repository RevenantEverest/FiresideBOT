import * as types from './types';
import * as actions from './actions';

const initialState = {
    loading: false,
    items: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CHANGELOGS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CHANGELOGS_SUCCESS: 
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case types.GET_CHANGELOGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export { actions };
export default reducer;