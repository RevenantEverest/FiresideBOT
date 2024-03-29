import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';

import { Theme } from './src/theme';
import Navigation from './src/navigation/Navigation';

function App() {

    return (
        <ThemeProvider useDark={true} theme={Theme}>
            {/* <Provider store={store}> */}
                <Navigation />
                <StatusBar />
            {/* </Provider> */}
        </ThemeProvider>
    );
};

export default App;
