import { discordServices } from "../../api";
import * as types from './types';

export const getGuildsRequest = () => ({
    type: types.GET_GUILDS_REQUEST
});

export const getGuildsSuccess = (guilds) => ({
    type: types.GET_GUILDS_SUCCESS,
    payload: guilds
});

export const getGuildsFailure = (err) => ({
    type: types.GET_GUILDS_FAILURE,
    payload: err
});

export const updateManagedGuild = (guild) => ({
    type: types.UPDATE_MANAGED_GUILD,
    payload: guild
});

export const getGuilds = (discordID) => {
    return (dispatch, getState) => {
        const { auth } = getState();

        dispatch(getGuildsRequest);
        discordServices.getUserGuilds(discordID, auth.user.token)
        .then(response => {
            const guilds = response.data.data;
            dispatch(getGuildsSuccess(guilds));
        })
        .catch(err => dispatch(getGuildsFailure(err)));
    };
};