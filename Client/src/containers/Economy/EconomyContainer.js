import React from 'react';
import { connect } from 'react-redux';
import { EconomyPage } from '../../pages/Economy';

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

function EconomyContainer(props) {
    return(
        <EconomyPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EconomyContainer);