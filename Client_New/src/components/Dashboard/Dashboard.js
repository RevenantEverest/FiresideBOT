import React, { Component } from 'react';
import './Dashboard.css';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBBadge
} from 'mdbreact';

import WeeklyWrapup from '../WeeklyWrapup/WeeklyWrapup';

import Skin from '../../res/Skin';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            changelog: this.props.changelogs[1]
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
            <div id="Dashboard" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Dashboard</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Dashboard</p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <WeeklyWrapup />
                    </Col>
                </Row>
                <Row className="Component-Content justify-content-md-center">
                    <Col>
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
                                <MDBBtn color={Skin.hex} style={{ background: "#A42700" }} size="md">View Full Changelog</MDBBtn>
                            </Link>
                        </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Dashboard;