import React from 'react';
import { connect } from 'react-redux';
import { FeaturesPage } from '../../pages/Features';

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

function FeaturesContainer(props) {
    return(
        <FeaturesPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturesContainer);