import React from 'react';
import { connect } from 'react-redux';
import { RouteAnimation } from '../../components/Common';
import { RanksPage } from '../../pages/Ranks';

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

function RanksContainer(props) {
    return(
        <RouteAnimation>
            <RanksPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RanksContainer);