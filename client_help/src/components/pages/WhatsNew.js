import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardText,
    MDBBadge
} from 'mdbreact';

import changelogServices from '../../services/changelogServices';

class WhatsNew extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getChangelog();
    }

    componentWillUnmount = () => this._isMounted = false;

    getChangelog() {
        if(!this._isMounted) return;
        changelogServices.getChangeLogs()
        .then(changelogs => this.setState({ changelog: changelogs.data.data[0] }))
        .catch(err => console.error(err));
    }

    renderHelmet() {
        const changelog = this.state.changelog;
        return(
            <Helmet>
                <title>FiresideBOT | Changelog v{changelog.version}</title>
                <meta name="theme-color" content="#ff9900" />
                <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`FiresideBOT | Changelog v${changelog.version}`} />
                <meta property="og:description" content={changelog.content} />
                <meta property="og:url" content="https://firesidebot.com" />
                <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
            </Helmet>
        );
    }

    renderChangelog() {
        const changelog = this.state.changelog;
        return(
            <Col>
            <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
            <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                Recent Changelog v{changelog.version}
            </MDBCardHeader>
            <MDBCardBody>
                <MDBCardText tag="div">
                    <Row style={{ marginBottom: "2%" }}>
                        <Col>
                            <h6 className="h6 display-inline" style={{ color: "#cccccc", fontWeight: 600 }}>Release Date: </h6>
                            <MDBBadge color="dark" className="display-inline">{changelog.release_date}</MDBBadge>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReactMarkdown source={changelog.content} />
                        </Col>
                    </Row>
                </MDBCardText>
            </MDBCardBody>
            </MDBCard>
            </Col>
        );
    }

    render() {
        return(
            <div id="WhatsNew" className="app-page" style={{ marginTop: "2%" }}>
                {this.state.changelog ? this.renderHelmet() : ''}
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">What's New</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ WhatsNew</p>
                    </Col>
                </Row>
                <Row>
                    {this.state.changelog ? this.renderChangelog() : ''}
                </Row>
                </Container>
            </div>
        );
    }
};

export default WhatsNew;