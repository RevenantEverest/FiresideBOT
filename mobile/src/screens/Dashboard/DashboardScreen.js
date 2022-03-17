import React from 'react';
import { View } from 'react-native';
import { makeStyles } from 'react-native-elements';

function DashboardScreen() {

    const styles = useStyles();

    return(
        <View style={styles.container}>
        </View>
    );
};

const useStyles = makeStyles((theme, props) => ({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: theme.colors.background
    }
}));

export default DashboardScreen;