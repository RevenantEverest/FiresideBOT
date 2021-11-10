import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../store';
import { authServices } from '../../api';
import { LoginPage } from '../../pages/Login';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userData: state.auth.user
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            login: (code) => {
                dispatch(authActions.login(code));
            }
        }
    };
};

function LoginContainer(props) {
    return(
        <LoginPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);