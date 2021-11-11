import React from 'react';
import { connect } from 'react-redux';
import { AnalyticsPage } from '../../pages/Analytics';

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

function AnalyticsContainer(props) {
    return(
        <AnalyticsPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalyticsContainer);