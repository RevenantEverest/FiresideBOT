import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

function RootNavigator() {

    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Root"
            options={{ headerShown: false }}
            component={DrawerNavigator}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;