import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';

class PublishChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();

    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });
    toggleSuccessNotify = () => toast.success("Created Successfully", { position: "top-center", autoClose: 5000 });

    render() {
        const changelog = this.props.changelog;
        return(
            <Container>
            <ToastContainer position="top-center" autoClose={5000} newestOnTop hideProgressBar={true} />
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} fullHeight position="top">
                <MDBModalHeader style={{ background: "#2c2c2c", border: "thin solid #2c2c2c" }}>
                    Publish Changelog {changelog.version}
                </MDBModalHeader>
                <MDBModalBody className="Modal-light">
                <form id="CreateModal" onSubmit={this.handleSubmit}>
                    <Container>
                    <Row className="mt-4 mb-4">
                        <Col lg={6} md={12}>
                        <h5 className="h5 mb-4">Flavor Text</h5>
                        <div className="input-group">
                            <div className="input-group-prepend form_input">
                                <span className="input-group-text form_inputIcon" id="basic-addon">
                                <i className="fas fa-pencil-alt prefix" />
                                </span>
                            </div>
                            <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="8" 
                            name="flavor_text"
                            style={{ padding: "10px", height: "270px", width: "90%", overflowY: "scroll" }}
                            onChange={this.handleChange}
                            />
                        </div>
                        </Col>
                        <Col>
                        <h5 className="h5 mb-4">Publishing Options</h5>
                        <div class="custom-control custom-checkbox mb-2">
                            <input type="checkbox" class="custom-control-input" id="SendEmbed" />
                            <label class="custom-control-label" for="SendEmbed">Send Embed</label>
                        </div>
                        <div class="custom-control custom-checkbox mb-2">
                            <input type="checkbox" class="custom-control-input" id="PostTweet" />
                            <label class="custom-control-label" for="PostTweet">Post Tweet</label>
                        </div>
                        <div class="custom-control custom-checkbox mb-2">
                            <input type="checkbox" class="custom-control-input" id="FacebookPost" disabled />
                            <label class="custom-control-label" for="FacebookPost">Facebook Post</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="InstagramPost" disabled />
                            <label class="custom-control-label" for="InstagramPost">InstagramPost</label>
                        </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                        <MDBCard>
                        <MDBCardHeader>v{changelog.version} {changelog.type}</MDBCardHeader>
                        <MDBCardBody style={{ overflowY: "scroll", height: "300px", background: "#1e1e1e" }}>
                            <ReactMarkdown source={changelog.content} />
                        </MDBCardBody>
                        </MDBCard>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <MDBBtn color="elegant" size="md" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="elegant" className="Button-dark" size="md" onClick={this.handleSubmit}>Publish</MDBBtn>
                        </Col>
                    </Row>
                    </Container>
                </form>
                </MDBModalBody>
            </MDBModal>
            </Container>
        );
    }
};

export default PublishChangelog;