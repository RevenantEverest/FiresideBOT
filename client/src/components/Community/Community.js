import React, { Component } from 'react';
import './Community.css';

import UnderConstruction from '../UnderConstruction/UnderConsturction';

class Community extends Component {

    constructor(props) {
        super(props);
        this.satte = {};
    }

    render() {
        return(
            <div id="Community" style={{ marginTop: "2%" }}>
            <UnderConstruction />
            </div>
        );
    }
};

export default Community;