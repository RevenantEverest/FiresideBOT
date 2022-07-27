import React from 'react';
import { connect } from 'react-redux';
import { RouteAnimation } from '../../components/Common';
import { PlaylistsPage } from '../../pages/Playlists';

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

function PlaylistsContainer(props) {
    return(
        <RouteAnimation>
            <PlaylistsPage {...props} />
        </RouteAnimation>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistsContainer);