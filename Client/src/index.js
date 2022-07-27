import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import { RootContainer } from './containers';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <PersistGate persistor={persistor}>
                    <RootContainer />
                </PersistGate>
            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
