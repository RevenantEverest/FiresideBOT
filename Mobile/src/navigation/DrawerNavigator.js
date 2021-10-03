import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    HomeContainer,
    AccountContainer,
    LoginContainer
} from '../containers';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return(
        <Drawer.Navigator
        initialRouteName="Home"
        >
            <Drawer.Screen
            name="Home"
            component={HomeContainer}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;