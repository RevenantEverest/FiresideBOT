import React from 'react';
import { connect } from 'react-redux';
import { CustomCommandsPage } from '../../pages/CustomCommands';

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

function CustomCommandsContainer(props) {
    return(
        <CustomCommandsPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomCommandsContainer);