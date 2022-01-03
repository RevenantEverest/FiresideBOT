import React from 'react';
import { connect } from 'react-redux';
import { authActions, changelogActions, guildActions } from '../../store';
import Navigation from '../../navigation/Navigation';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userData: state.auth.user,
        guilds: state.guilds,
        managedGuild: state.guilds.managedGuild,
        changelogs: state.changelogs
    };
};

function mapDispatchToProps(dispatch) {
    return {
        api: {
            logout: () => {
                dispatch(guildActions.updateManagedGuild(null));
                return dispatch(authActions.logout());
            },
            getGuilds: (discordID) => {
                return dispatch(guildActions.getGuilds(discordID));
            },
            updateManagedGuild: (guild) => {
                return dispatch(guildActions.updateManagedGuild(guild));
            },
            getChangelogs: () => {
                return dispatch(changelogActions.getChangelogs());
            }
        }
    };
};

function NavigationContainer(props) {
    return(
        <Navigation {...props} />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer);