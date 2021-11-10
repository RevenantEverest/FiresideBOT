import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

import { actions as authActions } from './auth';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

export {
    authActions
};
export default store;