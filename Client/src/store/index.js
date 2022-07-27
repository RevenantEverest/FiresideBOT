import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

import { actions as authActions } from './auth';
import { actions as changelogActions } from './changelogs';
import { actions as guildActions } from './guilds';
import { actions as themeActions } from './theme';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export {
    authActions,
    changelogActions,
    guildActions,
    themeActions,

    store, 
    persistor
};