import React from 'react';
import { connect } from 'react-redux';
import { DashboardPage } from '../../pages/Dashboard';

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

function DashboardContainer(props) {
    return(
        <DashboardPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);