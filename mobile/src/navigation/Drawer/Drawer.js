import React from 'react';
import { View, Pressable } from 'react-native';
import { Image, Icon, Text, makeStyles } from 'react-native-elements';

import Logo from '../../assets/logo.png';

const routes = [
    { title: "Dashboard", iconName: "tachometer-alt", goTo: "Dashboard" },
    { title: "Custom Commands", iconName: "magic", goTo: "CustomCommands" },
    { title: "Analytics", iconName: "chart-line", goTo: "Analytics" },
    { title: "Ranks", iconName: "award", goTo: "Ranks" },
    { title: "Economy", iconName: "coins", goTo: "Economy" },
    { title: "Moderation", iconName: "bolt", goTo: "Moderation" },
    { title: "Trackers", iconName: "crosshairs", goTo: "Trackers" },
    { title: "Server Settings", iconName: "cogs", goTo: "ServerSettings" },
];

function Drawer({ navigation, state }) {

    const styles = useStyles();

    const historyRoutes = state.history.filter(route => route.type === "route");
    const currentRoute = historyRoutes[historyRoutes.length - 1].key.split("-")[0];

    const renderRoutes = () => {
        let Routes = routes.map(route => (
            <Pressable onPress={() => navigation.navigate(route.goTo)}>
            <View style={[styles.routeWrapper, currentRoute === route.goTo ? styles.active : {}]}>
                <View style={styles.route} key={route.title}>
                        <Icon name={route.iconName} type="font-awesome-5" size={18} containerStyle={styles.iconContainer} />
                        <Text style={styles.routeText}>
                            {route.title}
                        </Text>
                </View>
            </View>
            </Pressable>
        ));

        return Routes;
    };

    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={Logo} style={{ height: 150, width: 150 }} />
            </View>
            <View style={styles.routesContainer}>
                {renderRoutes()}
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.header
    },
    logoContainer: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "center"
    },
    routeWrapper: {
        paddingTop: 10,
        paddingBottom: 10
    },
    routesContainer: {
        marginTop: 20
    },
    route: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: 10
    },
    iconContainer: {
        justifyContent: "center",
        width: "15%"
    },
    routeText: {
        fontSize: 16
    },
    active: {
        backgroundColor: "rgba(0,0,0,.5)"
    }
}));

export default Drawer;