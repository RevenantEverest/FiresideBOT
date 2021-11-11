import React from 'react';
import { connect } from 'react-redux';
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
        <RanksPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RanksContainer);