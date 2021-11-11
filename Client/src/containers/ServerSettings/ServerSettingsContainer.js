import React from 'react';
import { connect } from 'react-redux';
import { ServerSettingsPage } from '../../pages/ServerSettings';

function mapStateToProps(state) {
    return {
        userData: state.auth.user
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            
        }
    };
};

function ServerSettingsContainer(props) {
    return(
        <ServerSettingsPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerSettingsContainer);