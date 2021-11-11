import React from 'react';
import { connect } from 'react-redux';
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
        <PlaylistsPage {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistsContainer);