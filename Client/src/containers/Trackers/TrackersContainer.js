import React from 'react';
import { connect } from 'react-redux';
import { RouteAnimation } from '../../components/Common';
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
        <RouteAnimation>
            <TrackersPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackersContainer);