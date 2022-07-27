import * as types from './types';
import * as actions from './actions';

import { light as lightTheme } from '../../themes';

const initialState = lightTheme;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.UPDATE_THEME:
            state = action.payload
            return state;
        default:
            return state;
    };
};

export { actions }
export default reducer;