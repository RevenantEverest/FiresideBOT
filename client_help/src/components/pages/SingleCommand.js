import React, { Component } from 'react';
import '../css/SingleCommand.css';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardText,
    MDBBadge
} from 'mdbreact';

class SingleCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderAliases(command) {
        return(
            <Row className="mb-4">
                <Col>
                <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                        Aliases
                    </MDBCardHeader>
                    <MDBCardBody>
                    <MDBCardText>
                        <h6  className="h6 display-inline">
                            {
                                command.aliases.map((alias, idxxx) => <MDBBadge key={idxxx} color="dark" className="mr-2">{alias}</MDBBadge>)
                            }
                        </h6>
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </Col>
            </Row>
        );
    }

    renderParams(command) {
        return(
            <Row className="mb-4">
                <Col>
                <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                        Params
                    </MDBCardHeader>
                    <MDBCardBody>
                    <MDBCardText>{command.params.params}</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </Col>
            </Row>
        );
    }

    renderFlags(command) {
        return(
            <Row className="mb-4">
                <Col>
                <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                        Flags
                    </MDBCardHeader>
                    <MDBCardBody>
                    <MDBCardText>
                        {
                            command.flags.map((flag, idxxx) => <MDBBadge key={idxxx} color="dark" className="h6 display-inline">{`${flag} `}</MDBBadge>)
                        }
                    </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </Col>
            </Row>
        );
    }

    render() {
        const command = this.props.command;
        return(
            <div id="SingleCommand" className="app-page">
                <Helmet>
                    <title>FiresideBOT | {command.d_name}</title>
                    <meta name="theme-color" content="#ff9900" />
                    <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={`FiresideBOT | ${command.d_name}`} />
                    <meta property="og:description" content={`${command.desc}`} />
                    <meta property="og:url" content="https://firesidebot.com" />
                    <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
                </Helmet>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header display-inline">{command.d_name}</h1>
                        {command.params ? <h5 className="h5 display-inline ml-3 sc-h-param"><MDBBadge color="dark">{(command.params.required ? '<param>' : '[param]')}</MDBBadge></h5> : ''}
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <Link to="/commands"><p className="Component-Breadcrumb">/ Commands </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ {command.d_name}</p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "3%" }}>
                    <Col>
                    <MDBBadge color="dark" className="display-inline">{`<param>`}</MDBBadge>
                    <h6 className="h6 display-inline"> is a required param and </h6>
                    <MDBBadge color="dark" className="display-inline">{`[param]`}</MDBBadge>
                    <h6 className="h6 display-inline"> is an optional param.</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Row className="mb-4">
                        <Col>
                        <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                        <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                            Description
                        </MDBCardHeader>
                        <MDBCardBody>
                        <MDBCardText>{command.desc}</MDBCardText>
                        </MDBCardBody>
                        </MDBCard>
                        </Col>
                    </Row>
                    {command.aliases.length > 0 ? this.renderAliases(command) : ''}
                    {command.params ? this.renderParams(command) : ''}
                    {command.flags ? this.renderFlags(command) : ''}
                    <Row>
                        <Col>
                        <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                        <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                            Example
                        </MDBCardHeader>
                        <MDBCardBody>
                        <MDBCardText>?{command.example}</MDBCardText>
                        </MDBCardBody>
                        </MDBCard>
                        </Col>
                    </Row>
                    </Col>
                    <Col>
                        <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                        <MDBCardHeader style={{ background: "#2c2c2c", color: "#ccccc" }}>
                            Video Tutorials Coming Soon
                        </MDBCardHeader>
                        <MDBCardBody>
                            <YouTube
                            videoId={"dQw4w9WgXcQ"}                              
                            className={"YouTube-Player"}                
                            containerClassName={""}       
                            opts={{ height: 390, width: 640, playerVars: { autoplay: 0 } }}
                            />
                        </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default SingleCommand;