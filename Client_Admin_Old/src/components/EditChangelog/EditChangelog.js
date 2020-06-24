import React, { Component } from 'react';
import './EditChangelog.css';

import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBInput,
    MDBBtn
} from 'mdbreact';

import changelogServices from '../../services/changelogServices';

import Skin from '../../res/Skin';

class EditCahngeLog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            changelogData: this.props.changelogData,
            content: this.props.changelogData.content,
            flavorText: "",
            send_embed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    handleCheckboxChange = (e) => this.setState({ send_embed: !this.state.send_embed });
    handleSubmit(e, publish) {
        e.preventDefault();
        let data = {
            id: this.props.changelogData.id,
            flavor_text: this.state.flavorText ? this.state.flavorText : null,
            content: this.state.content ? this.state.content : this.props.changelogData.content,
            version: this.state.version ? this.state.version : this.props.changelogData.version,
            type: this.state.type ? this.state.type : this.props.changelogData.type,
            send_embed: this.state.send_embed ? this.state.send_embed : false
        };
        
        if(publish && this.props.changelog)
            return this.updateChangelog(data);
        else if(publish && !this.props.changelog)
            return this.publishChangelog(data);
        else if(!publish && this.props.changelog)
            return this.updateChangelog(data);
        else return this.updateWorkingChangelog(data);
    }

    publishChangelog(data) {
        changelogServices.publishChangelog(data)
        .then(() => {
            this.props.getChangelogs();
            this.props.closeModal();
        })
        .catch(err => console.error(err));
    }

    updateChangelog(data) {
        changelogServices.editChangelog(data)
        .then(() => {
            this.props.getChangelogs();
            this.props.closeModal();
        })
        .catch(err => console.error(err));
    }

    updateWorkingChangelog(data) {
        changelogServices.editWorkingChangelog(data)
        .then(() => {
            this.props.changelog ? this.props.getChangelogs() : this.props.getWorkingChangelogs();
            this.props.closeModal();
        })
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="EditChangelog">
                <Container>
                <Row>
                    <Col lg={6} style={{ marginBottom: "2%" }}>
                    <MDBCard className="w-auto" >
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "25vh", color: "#cccccc" }}>
                        <Row style={{ marginBottom: "5%" }}>
                            <Col lg={4}>
                            <MDBInput 
                            name="version"
                            label="Version"
                            value={this.state.version ? this.state.version : this.props.changelogData.version}
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col lg={4}>
                            <MDBInput 
                            name="type" 
                            label="Type" 
                            value={this.state.type ? this.state.type : this.props.changelogData.type} 
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col lg={4}>
                            <MDBInput 
                            label="Send Embed" 
                            filled 
                            type="checkbox" 
                            id="checkbox2" 
                            name="send_embed" 
                            onChange={this.handleCheckboxChange} />
                            </Col>
                        </Row>
                        <MDBCardText tag="div">
                        <Row>
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
                            name="flavorText"
                            value={this.state.flavorText}
                            onChange={this.handleChange}
                            />
                        </div>
                        </Row>
                        <br />
                        <br />
                        <Row>
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
                            placeholder={this.props.changelogData.content}
                            onChange={this.handleChange}
                            />
                        </div>
                        </Row>
                        </MDBCardText>
                        <MDBBtn color="elegant" onClick={this.props.closeModal}>Close</MDBBtn>
                        <MDBBtn color="mdb-color" onClick={(e) => this.handleSubmit(e, false)}>Save</MDBBtn>
                        <MDBBtn color={Skin.MDBColor} className="Button" onClick={(e) => this.handleSubmit(e, true)}>Publish</MDBBtn>
                    </MDBCardBody>
                    </MDBCard>
                    </Col>
                    <Col style={{ marginBottom: "2%" }}>
                    <MDBCard className="w-auto">
                    <MDBCardBody style={{ background: "#1a1a1a", minHeight: "65vh" }}>
                        <MDBCardText tag="div" style={{ height: "65vh", overflowY: "scroll" }}>
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

export default EditCahngeLog;