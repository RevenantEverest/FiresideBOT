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
    MDBInput,
    toast,
    ToastContainer
} from 'mdbreact';

import changelogServices from '../../services/changelogServices';

class PublishChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.getSendEmbedValue = this.getSendEmbedValue.bind(this);
        this.getPostTweetValue = this.getPostTweetValue.bind(this);
        this.getFacebookPostValue = this.getFacebookPostValue.bind(this);
        this.getInstagramPostValue = this.getInstagramPostValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    getSendEmbedValue = (value) => this.setState({ sendEmbed: value });
    getPostTweetValue = (value) => this.setState({ postTweet: value });
    getFacebookPostValue = (value) => this.setState({ facebookPost: value });
    getInstagramPostValue = (value) => this.setState({ instagramPost: value });

    handleSubmit(e) {
        e.preventDefault();

        let data = {
            content: this.props.changelog.content,
            version: this.props.changelog.version,
            type: this.props.changelog.type,
            flavor_text: this.state.flavor_text ? this.state.flavor_text : "",
            send_embed: this.state.sendEmbed
        };

        changelogServices.publish(data)
        .then()
        .catch(err => {
            console.error(err);
            this.toggleFailureNotify("Could not publish changelog");
        });
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
                        <div>
                            <MDBInput containerClass="form-check checkbox-rounded" labelClass="form-check-label" label="Send Embed"
                            type="checkbox" className="checkbox-rounded" id="SendEmbed" filled getValue={this.getSendEmbedValue} />
                        </div>
                        <div>
                            <MDBInput containerClass="form-check checkbox-rounded" labelClass="form-check-label" label="Post Tweet"
                            type="checkbox" className="checkbox-rounded" id="PostTweet" filled getValue={this.getPostTweetValue} />
                        </div>
                        <div>
                            <MDBInput containerClass="form-check checkbox-rounded" labelClass="form-check-label" label="Facebook Post"
                            type="checkbox" className="checkbox-rounded" id="FacebookPost" filled getValue={this.getFacebookPostValue} />
                        </div>
                        <div>
                            <MDBInput containerClass="form-check checkbox-rounded" labelClass="form-check-label" label="Instagram Post"
                            type="checkbox" className="checkbox-rounded" id="InstagramPost" filled getValue={this.getInstagramPostValue} />
                        </div>
                        {/* <div class="custom-control custom-checkbox mb-2">
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
                        </div> */}
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