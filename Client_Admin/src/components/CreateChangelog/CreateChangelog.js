import React, { Component } from 'react';
import './CreateChangelog.css';

import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBtn,
    MDBInput
} from 'mdbreact';

import changelogServices from '../../services/changelogServices';

class CreateChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            content: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            content: this.state.content,
            version: this.state.version,
            type: this.state.type
        };

        changelogServices.createWorkingChangelog(data)
        .then(() => {
            this.props.getWorkingChangelogs()
            this.props.closeModal();
        })
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="CreateChangelog">
                <Container>
                <Row>
                    <Col lg={6} style={{ marginBottom: "2%" }}>
                    <MDBCard className="w-auto" >
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "25vh", color: "#cccccc" }}>
                        <Row style={{ marginBottom: "5%" }}>
                            <Col lg={6}>
                            <MDBInput name="version" label="Version" onChange={this.handleChange} />
                            </Col>
                            <Col lg={6}>
                            <MDBInput name="type" label="Type" onChange={this.handleChange} />
                            </Col>
                        </Row>
                        <MDBCardText tag="div">
                        <div className="input-group" style={{ minHeight: "21vh" }}>
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
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            />
                        </div>
                        </MDBCardText>
                        <MDBBtn color="elegant" onClick={this.props.closeModal}>Close</MDBBtn>
                        <MDBBtn color="mdb-color" onClick={this.handleSubmit}>Save</MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                    <Col style={{ marginBottom: "2%" }}>
                    <MDBCard className="w-auto">
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "41vh" }}>
                        <MDBCardText tag="div" style={{ height: "36vh", overflowY: "scroll" }}>
                        <ReactMarkdown source={this.state.content} />
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

export default CreateChangelog;