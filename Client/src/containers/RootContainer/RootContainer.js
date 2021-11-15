import React from 'react';
import { connect } from 'react-redux';
import { themeActions } from '../../store';
import App from '../../App';

function mapStateToProps(state) {
    return {
        theme: state.theme
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            updateTheme: (theme) => dispatch(themeActions.updateTheme(theme))
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