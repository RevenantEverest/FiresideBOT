import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import changelogs from './changelogs';
import theme from './theme';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'theme']
};

const rootReducer = combineReducers({
    auth: auth,
    changelogs: changelogs,
    theme: theme
});

export default persistReducer(persistConfig, rootReducer);