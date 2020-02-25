import React, { Component } from 'react';
import './SingleChangelog.css';

import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBtn,
    MDBBadge
} from 'mdbreact';

import Skin from '../../../res/Skin';

class SingleChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div id="SingleChangelog" style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Helmet>
                <title>FiresideBOT | Changelog v{this.props.changelog.version}</title>
                <meta name="theme-color" content="#ff9900" />
                <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`FiresideBOT | Changelog v${this.props.changelog.version}`} />
                <meta property="og:description" content={this.props.changelog.content} />
                <meta property="og:url" content="https://firesidebot.com" />
                <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
            </Helmet>
            <Container>
            <Row style={{ marginBottom: "2%" }}>
                <Col>
                    <Link to="/changelogs">
                    <MDBBtn color={Skin.hex} className="Button" size="sm" style={{ background: Skin.hex, width: "180px" }}>
                    <FontAwesomeIcon className="FontAwesomeIcon" icon="arrow-left" />
                    Back to Changelogs
                    </MDBBtn>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                <MDBCardBody>
                    <MDBCardText tag="div">
                        <Row style={{ marginBottom: "2%" }}>
                        <Col>
                            <h6 className="h6 display-inline" style={{ color: "#cccccc", fontWeight: 600 }}>Release Date: </h6>
                            <MDBBadge color="dark" className="display-inline">{this.props.changelog.release_date}</MDBBadge>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        <ReactMarkdown source={this.props.changelog.content} />
                        </Col>
                        </Row>
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
};

export default SingleChangelog;