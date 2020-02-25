import React, { Component } from 'react';
import './RecentChangelog.css';

import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBBadge
} from 'mdbreact';

import Skin from '../../../res/Skin';

class RecentChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changelog: this.props.changelogs[0]
        }
    }

    render() {
        let changelog = this.state.changelog.content;
        let description = "";
        let contentCharArr = changelog.split(" ");
        contentCharArr.splice(1, 1);
        contentCharArr.splice(1, 1);
        contentCharArr = contentCharArr.join(" ").split("");
        contentCharArr.forEach((el, idx) => idx <= 300 ? (el === "#" ? description += '' : description += el) : description += '');
        return(
            <div id="RecentChangelog">
                <MDBCard style={{ background: "#1a1a1a"}}>
                <MDBCardHeader style={{ background: "#262626" }}>
                <FontAwesomeIcon icon="bullhorn" style={{ marginTop: "4px", marginRight: "2%" }} />
                What's New
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle tag="div">
                    <h4 className="h4">Changelog v{this.state.changelog.version} </h4>
                    <h6 className="h6 display-inline">Release Date: </h6>
                    <MDBBadge color="dark" className="display-inline">{this.state.changelog.release_date}</MDBBadge>
                    </MDBCardTitle>
                    <MDBCardText tag="div">
                    <ReactMarkdown source={description} />
                    </MDBCardText>
                    <Link to={`/changelogs/v${this.state.changelog.version}`}>
                        <MDBBtn className="Button" color={Skin.hex} style={{ background: "#A42700" }} size="md">View Full Changelog</MDBBtn>
                    </Link>
                </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
};

export default RecentChangelog;