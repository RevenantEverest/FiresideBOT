import React, { Component } from 'react';
import './ChangelogRouter.css';

import { Route } from 'react-router-dom';

import Changelogs from '../Changelogs';
import SingleChangeLog from '../SingleChangelog/SingleChangelog';

import changelogServices from '../../../services/changelogServices';

class ChangelogRouter extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getChangeLogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    getChangeLogs() {
        if(!this._isMounted || window.location.search) return setTimeout(() => this.getChangeLogs(), 2000);
        changelogServices.getChangeLogs()
        .then(changelogs => this.setState({ changelogs: changelogs.data.data }, () => this.props.getChangelogs(changelogs.data.data)))
        .catch(err => console.error(err));
    }

    routeChangeLogs() {
        let ChangeLogs = this.state.changelogs.map((el, idx) => {
            return <Route key={idx} exact path={`/changelogs/v${el.version}`} component={() => (<SingleChangeLog changelog={el} />)} />
        });

        return ChangeLogs;
    }

    render() {
        let userData = this.props.userData;
        return(
            <div id="ChangeLogRouter">
            {this.state.changelogs ? this.routeChangeLogs() : ''}
            {this.state.changelogs ? <Route exact path="/changelogs" component={() => (<Changelogs userData={userData} changelogs={this.state.changelogs} />)} /> : ''}
            </div>
        );
    }
};

export default ChangelogRouter;