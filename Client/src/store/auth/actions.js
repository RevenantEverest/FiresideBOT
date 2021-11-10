import { authServices } from '../../api';
import * as types from './types';

export const loginRequest = () => ({
    type: types.LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (err) => ({
    type: types.LOGIN_FAILURE,
    payload: err
});

export const login = (data) => {
    return (dispatch) => {
        dispatch(loginRequest);
        authServices.login(data)
        .then(response => {
            const user = response.data.data;
            dispatch(loginSuccess(user));
        })
        .catch(err => dispatch(loginFailure(err)));
    };
};