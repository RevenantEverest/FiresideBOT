import React from 'react';
import { connect } from 'react-redux';
import { changelogActions } from '../../store';
import { RouteAnimation } from '../../components/Common';
import { DashboardPage } from '../../pages/Dashboard';

function mapStateToProps(state) {
    return {
        userData: state.auth.user,
        changelogs: state.changelogs.changelogs
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            getChangelogs: () => {
                dispatch(changelogActions.getChangelogs());
            }
        }
    };
};

function DashboardContainer(props) {
    return(
        <RouteAnimation>
            <DashboardPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);