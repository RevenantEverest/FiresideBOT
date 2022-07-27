import React from 'react';
import { connect } from 'react-redux';
import { RouteAnimation } from '../../components/Common';
import { ChangelogDetailsPage } from '../../pages/Changelogs';

function mapStateToProps(state) {
    return {
        userData: state.auth.user,
        changelogs: state.changelogs
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            
        }
    };
};

function ChangelogDetailsContainer(props) {
    return(
        <RouteAnimation>
            <ChangelogDetailsPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangelogDetailsContainer);