import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@fluentui/react-theme-provider';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { dark, light } from './themes';
import Navigation from './navigation/Navigation';

library.add(fab);

function App() {

    const [theme, setTheme] = useState(dark);

    const changeTheme = (themeType) => {
        switch(themeType) {
            case "dark":
                return setTheme(dark);
            case "light": 
                return setTheme(light);
            default:
                return setTheme(dark);
        };
    };

    return(
        <ThemeProvider id="App" theme={theme}>
            <Router>
            <div>
                <Navigation changeTheme={changeTheme} />
            </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;