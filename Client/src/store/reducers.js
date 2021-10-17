import { combineReducers } from 'redux';

import users from './users';

const reducers = combineReducers({
    userData: users
});

export default reducers;