import React from 'react';
import { connect } from 'react-redux';
import { RouteAnimation } from '../../components/Common';
import { ChangelogsPage } from '../../pages/Changelogs';

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

function ChangelogsContainer(props) {
    return(
        <RouteAnimation>
            <ChangelogsPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangelogsContainer);