import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

function Navigation({ colorScheme }) {
    console.log(colorScheme)
    return(
        <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
};

export default Navigation;