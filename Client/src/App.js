import React, { useEffect } from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { dark, light } from './themes';
import { NavigationContainer } from './containers';

library.add(fab);

function App({ api, userData, theme }) {

    useEffect(() => {
        if(userData)
            api.verify(userData.token);
    }, [api, userData]);

    const changeTheme = (themeType) => {
        switch(themeType) {
            case "dark":
                return api.updateTheme(dark);
            case "light": 
                return api.updateTheme(light);
            default:
                return api.updateTheme(dark);
        };
    };

    return(
        <div>
        <ThemeProvider id="App" theme={theme}>
            <NavigationContainer changeTheme={changeTheme} />
        </ThemeProvider>
        </div>
    );
};

export default App;