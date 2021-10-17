import {
    ADD_USERDATA,
    UPDATE_USERDATA,
    REMOVE_USERDATA
} from './types';

export const addUserData = content => ({
    type: ADD_USERDATA,
    payload: content
});

export const updateUserData = content => ({
    type: UPDATE_USERDATA,
    payload: content
});

export const removeUserData = content => ({
    type: REMOVE_USERDATA,
    payload: content
});