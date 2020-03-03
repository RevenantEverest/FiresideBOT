import React, { Component } from 'react';
import './FAQ.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCollapse,
    MDBCollapseHeader,
    MDBIcon,
    MDBBtn
} from 'mdbreact';

import env from '../../env';

class FAQ extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${env.CLIENT_ID}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=bot`
    _helpLink = `https://help.firesidebot.com`;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData
        }
    }

    toggleCollapse(collapseID) {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }
        

    render() {
        const { collapseID } = this.state;
        return(
            <div id="FAQ">
                <Container>
                <Row>
                    <Col className="text-center">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Frequently Asked Questions
                    </h2>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <Container className='md-accordion mt-5'>
                    <MDBCard className='mt-3' style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse1')}
                        >
                        Why choose Fireside?
                        <MDBIcon icon={collapseID === 'collapse1' ? 'angle-up' : 'angle-down'} />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse1' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            <p>
                            Unlike other Discord Bots, Fireside aims to be a one stop shop for all your Discord Bot needs.
                            Take advantage of our extensive music functionality, server economy, ranking system, moderation commands
                            and server logging! All of which are fully customizeable! 
                            </p>  
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse2')}
                        >
                        Where can I find a list of Fireside commands?
                        <MDBIcon
                            icon={collapseID === 'collapse2' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse2' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            <p>You can view a list of all command as well as learning how to get started by clicking the button below</p>
                            <MDBBtn className="Button" size="sm" tag="a" target="_blank" rel="noopener noreferrer" href={this._helpLink}>Learn More</MDBBtn>
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse3')}
                        >
                        How do I get started?
                        <MDBIcon
                            icon={collapseID === 'collapse3' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse3' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            <p>
                            Out help site has an article displaying how to get started, you can view it by clicking the "Learn More" button below.
                            If you just want to add Fireside to your server you can click the "Add to Discord" button.
                            </p>
                            <MDBBtn className="Discord-Button" size="sm" tag="a" target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
                                Add to Discord
                            </MDBBtn>
                            <MDBBtn className="Button" size="sm" tag="a" target="_blank" rel="noopener noreferrer" href={this._helpLink}>Learn More</MDBBtn>
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse4')}
                        >
                        Where can I learn about Premium features?
                        <MDBIcon
                            icon={collapseID === 'collapse4' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse4' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            <p>
                                Fireside premium enhances your Fireside experience by providing a multitude of extra features as well as extending
                                the already extensive feature set. You can learn more about Fireside Premium by clicking the button below.
                            </p>
                            <Link to="/premium">
                            <MDBBtn className="Button" size="sm">Learn More</MDBBtn>
                            </Link>
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse5')}
                        >
                        Is it true that he who controls the meme, controls the universe?
                        <MDBIcon
                            icon={collapseID === 'collapse5' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse5' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            <p>Yes</p>   
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>
                    </Container>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default FAQ;