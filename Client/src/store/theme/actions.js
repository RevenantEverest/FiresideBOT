import * as types from './types';

export const updateTheme = (theme) => ({
    type: types.UPDATE_THEME,
    payload: theme
});