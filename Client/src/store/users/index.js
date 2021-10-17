import {
    ADD_USERDATA,
    UPDATE_USERDATA,
    REMOVE_USERDATA
} from './types';

const initialState = {

};

const users = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USERDATA:
            state = action.payload;
            return state;
        case UPDATE_USERDATA:
            state = action.payload;
            return state;
        case REMOVE_USERDATA:
            state = {};
            return state;
        default:
            return state;
    }
};

export default users;