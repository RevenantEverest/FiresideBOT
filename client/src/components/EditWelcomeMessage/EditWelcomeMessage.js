import React, { Component } from 'react';
import './EditWelcomeMessage.css';

import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBTooltip,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';

import welcomeMessageServices from '../../services/welcomeMessageServices';

import Skin from '../../res/Skin';

class EditWelcomeMessage extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getWelcomeMessage();
    }

    getWelcomeMessage() {
        if(!this._isMounted) return setTimeout(() => this.getWelcomeMessage(), 2000);
        if(!this.state.manageServer) return;
        welcomeMessageServices.getByGuildId(this.state.manageServer.id)
        .then(welcomeMessage => {
            this.setState({ 
                welcomeMessage: welcomeMessage.data.data, 
                message: welcomeMessage.data.data.message ? welcomeMessage.data.data.message : '', 
                dataReceived: true 
            })
        })
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.state.welcomeMessage.id ? this.state.welcomeMessage.id : null,
            message: this.state.message ? this.state.message : this.state.welcomeMessage.message,
            guild_id: this.state.manageServer.id
        };
        if(!data.id)
            welcomeMessageServices.save(data)
            .then(() => {
                this.toggleSuccessNotify();
                this.getWelcomeMessage();
            })
            .catch(err => console.error(err));
        else
            welcomeMessageServices.update(data)
            .then(() => {
                this.toggleSuccessNotify();
                this.getWelcomeMessage();
            })
            .catch(err => console.error(err));
    }

    toggleSuccessNotify() {
        return toast.success("Updated Successfully", {
            position: "top-right",
            autoClose: 5000       
        });;
    }

    toggleFailureNotify() {
        return toast.error(`Error: ${this.state.failureReason}`, {
            position: "top-right",
            autoClose: 5000       
        });;
    }

    renderForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row>
                    <Col>
                    <MDBCard className="w-100" >
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "350px", color: "#cccccc" }}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Welcome Message</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The content of message you want to send to new server members. (Allows Discord Markdown)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <MDBCardText tag="div" style={{ marginTop: "2%", marginBottom: "2%" }}>
                        <div className="input-group" style={{ height: "200px" }}>
                            <div className="input-group-prepend">
                                <span 
                                className="input-group-text" 
                                id="basic-addon" 
                                style={{ 
                                    background: "#151515",
                                    color: "#cccccc",
                                    border: "solid thin #0a0a0a"
                                }}>
                                <FontAwesomeIcon icon="pencil-alt" />
                                </span>
                            </div>
                            <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="5" 
                            style={{ 
                                background: "#1a1a1a",
                                border: "solid thin #0a0a0a",
                                color: "#cccccc",
                                height: "auto"
                            }}
                            name="message"
                            value={this.state.message}
                            onChange={this.handleChange}
                            />
                        </div>
                        </MDBCardText>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} onClick={this.handleSubmit}>Update</MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    render() {
        return(
            <div id="EditWelcomeMessage">
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
                <Row>
                    <Col>
                    {this.state.dataReceived ? this.renderForm() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                    <Col>
                    <MDBCard className="w-100">
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "350px" }}>
                        <Row>
                        <Col lg={5} style={{ paddingRight: 0 }}>
                            <label>Welcome Message Output</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>What the message looks like to recipients.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <MDBCardText 
                        tag="div" 
                        style={{ 
                            height: "200px", 
                            overflowY: "scroll", 
                            border: "solid thin #0a0a0a", 
                            color: "#cccccc",
                            marginTop: "2%",
                            marginBottom: "2%",
                            padding: "2%"
                        }}>
                        <ReactMarkdown source={this.state.message} />
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

export default EditWelcomeMessage;