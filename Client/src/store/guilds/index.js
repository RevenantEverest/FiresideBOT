import * as types from './types';
import * as actions from './actions';

const initialState = {
    loading: false,
    items: null,
    error: null,
    managedGuild: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_GUILDS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_GUILDS_SUCCESS:
            return {
                ...state,
                items: action.payload.filter(el => el.permissions >= 2146958591),
                loading: false
            };
        case types.GET_GUILDS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.UPDATE_MANAGED_GUILD:
            return {
                ...state,
                managedGuild: action.payload
            };
        default:
            return state;
    };
};

export { actions };
export default reducer;