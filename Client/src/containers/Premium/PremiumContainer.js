import React from 'react';
import { connect } from 'react-redux';
import { PremiumPage } from '../../pages/Premium';

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

function PremiumContainer(props) {
    return(
        <PremiumPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PremiumContainer);