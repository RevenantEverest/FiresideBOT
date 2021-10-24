import React from 'react';
import { connect } from 'react-redux';
import { discordServices } from '../../api';
import { HomePage } from '../../pages/Home';

function mapStateToProps(state) {
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            ...discordServices
        }
    };
};

function HomeContainer(props) {
    return(
        <HomePage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);