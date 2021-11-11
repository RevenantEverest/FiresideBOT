import React from 'react';
import { connect } from 'react-redux';
import { AutoDJPage } from '../../pages/AutoDJ';

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

function AutoDJContainer(props) {
    return(
        <AutoDJPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoDJContainer);