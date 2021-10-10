import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-elements';
import { Header } from './Headers';
import { Drawer as CustomDrawer } from './Drawer';

import {
    AnalyticsContainer,
    CustomCommandsContainer,
    DashboardContainer,
    EconomyContainer,
    ModerationContainer,
    RanksContainer,
    TrackersContainer,
    ServerSettingsContainer
} from '../containers';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

    const { theme } = useTheme();

    return(
        <Drawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
            header: (props) => <Header {...props} />
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={DashboardContainer} />
            <Drawer.Screen name="CustomCommands" component={CustomCommandsContainer} />
            <Drawer.Screen name="Analytics" component={AnalyticsContainer} />
            <Drawer.Screen name="Ranks" component={RanksContainer} />
            <Drawer.Screen name="Economy" component={EconomyContainer} />
            <Drawer.Screen name="Moderation" component={ModerationContainer} />
            <Drawer.Screen name="Trackers" component={TrackersContainer} />
            <Drawer.Screen name="ServerSettings" component={ServerSettingsContainer} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;