import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-theme-provider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import {
    HomeContainer,
    GettingStartedContainer
} from '../containers';

function Navigation(props) {

    const styles = useStyles();;

    return(
        <div className={"app " + styles.app}>
            <Navbar {...props} />
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/getting_started" component={GettingStartedContainer} />
            <Footer {...props} />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: theme.colors.background
    }
}));

export default withRouter(Navigation);