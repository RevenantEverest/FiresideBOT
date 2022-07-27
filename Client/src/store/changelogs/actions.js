import { changelogServices } from '../../api';
import * as types from './types';

export const getChangelogsRequest = () => ({
    type: types.GET_CHANGELOGS_REQUEST
});

export const getChangelogsSuccess = (changelogs) => ({
    type: types.GET_CHANGELOGS_SUCCESS,
    payload: changelogs
});

export const getChangelogsFailure = (err) => ({
    type: types.GET_CHANGELOGS_FAILURE,
    payload: err
});

export const getChangelogs = () => {
    return (dispatch) => {
        dispatch(getChangelogsRequest);
        changelogServices.getChangeLogs()
        .then(response => {
            const changelogs = response.data.data;
            dispatch(getChangelogsSuccess(changelogs));
        })
        .catch(err => dispatch(getChangelogsFailure(err)));
    };
};