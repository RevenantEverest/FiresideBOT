import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors, Icon } from 'react-native-elements';
import { Header } from './Headers';

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
        screenOptions={{
            header: (props) => (<Header {...props} />)
        }}
        >
            <Drawer.Screen
            name="Home"
            component={HomeContainer}
            />
            <Drawer.Screen
            name="Account"
            component={AccountContainer}
            />
            <Drawer.Screen
            name="Login"
            component={LoginContainer}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;