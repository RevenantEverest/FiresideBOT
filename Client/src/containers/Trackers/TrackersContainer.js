import React from 'react';
import { connect } from 'react-redux';
import { TrackersPage } from '../../pages/Trackers';

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

function TrackersContainer(props) {
    return(
        <TrackersPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackersContainer);