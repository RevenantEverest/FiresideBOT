import React from 'react';
import { connect } from 'react-redux';
import { ModerationPage } from '../../pages/Moderation';

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

function ModerationContainer(props) {
    return(
        <ModerationPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModerationContainer);