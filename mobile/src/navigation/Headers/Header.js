import React from 'react';
import { View } from 'react-native';
import { Icon, makeStyles, useTheme } from 'react-native-elements';

function Header({ route, navigation }) {

    const { theme } = useTheme();
    const styles = useStyles();

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Icon
                name="bars"
                type="font-awesome-5"
                size={24}
                containerStyle={styles.iconContainer}
                iconStyle={styles.icon}
                color={theme.colors.primary}
                onPress={() => navigation.toggleDrawer()} 
                />
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme, props) => ({
    container: {
        paddingTop: 45,
        backgroundColor: theme.colors.header
    },
    iconContainer: {
        marginRight: 15,
        marginBottom: 15
    },
    icon: {
        fontWeight: "600"
    }
}));

export default Header;