import React from 'react';
import { connect } from 'react-redux';
import { themeActions, authActions } from '../../store';
import App from '../../App';

function mapStateToProps(state) {
    return {
        userData: state.auth.user,
        theme: state.theme
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            updateTheme: (theme) => {
                return dispatch(themeActions.updateTheme(theme));
            },
            verify: (token) => {
                return dispatch(authActions.verify(token));
            }
        }
    };
};

function RootContainer(props) {
    return(
        <App {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);