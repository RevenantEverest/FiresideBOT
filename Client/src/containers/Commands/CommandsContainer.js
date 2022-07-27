import React from 'react';
import { connect } from 'react-redux';
import { CommandsPage } from '../../pages/Commands';

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

function CommandsContainer(props) {
    return(
        <CommandsPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommandsContainer);