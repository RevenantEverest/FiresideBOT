import { authServices } from '../../api';
import * as types from './types';

/* LOGIN */
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

export const logout = () => ({
    type: types.LOGOUT
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

/* VERIFYING */
export const verifyRequest = () => ({
    type: types.VERIFY_REQUEST
});

export const verifySuccess = () => ({
    type: types.VERIFY_SUCCESS
});

export const verifyFailure = (err) => ({
    type: types.VERIFY_FAILURE,
    payload: err
});

export const verify = (token) => {
    return (dispatch) => {
        dispatch(verifyRequest);
        authServices.verify(token)
        .then(() => dispatch(verifySuccess))
        .catch(err => dispatch(verifyFailure(err)));
    };
};