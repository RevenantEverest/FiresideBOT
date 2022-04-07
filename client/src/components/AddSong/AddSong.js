import React, { Component } from 'react';
import './AddSong.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBInput,
    MDBTooltip,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';

import userSongServices from '../../services/UserServices/userSongsServices';

import Skin from '../../res/Skin';

class AddSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            playlistData: this.props.playlistData
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.request) return this.toggleFailureNotify("No Empty Fields")
        let data = {
            playlist_id: this.props.playlistData.playlist_id,
            request: this.state.request
        };
        userSongServices.addSong(data)
        .then(() => {
            this.toggleSuccessNotify();
            this.props.toggleModal();
            this.props.getSongs();
        })
        .catch(err => this.toggleFailureNotify(`${err.response.data}`));
    }

    toggleSuccessNotify = () => toast.success("Added Successfully", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = (reason) => toast.error(`ERROR: ${reason}`, { position: "top-right", autoClose: 5000 });

    renderForm() {
        return(
            <Container fluid>
            <Row style={{ marginBottom: "2%" }}>
                <Col lg={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row>
                    <Col lg={4} style={{ paddingRight: 0 }}>
                        <label>Song Name</label>
                    </Col>
                    <Col lg={8}>
                        <MDBTooltip domElement tag="span" placement="right">
                            <span><FontAwesomeIcon icon="question-circle" /></span>
                            <span>YouTube search request or link.</span>
                        </MDBTooltip>
                    </Col>
                    </Row>
                    <Row>
                    <Col lg={8} id="AddSong-Request-Col">
                        <MDBInput 
                        name="request"
                        type="text" 
                        onChange={this.handleChange} 
                        />
                    </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={3} md={3} sm={3} xs={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <MDBBtn color="elegant" style={{ margin: 0 }} size="md" onClick={() => this.props.toggleModal()}>Close</MDBBtn>
                </Col>
                <Col lg={3} md={3} sm={3} xs={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <MDBBtn 
                    color={Skin.hex} 
                    style={{ background: Skin.hex, margin: 0 }} 
                    size="md" 
                    onClick={(e) => this.setState({ processing: true }, () => this.handleSubmit(e))}>
                        Add
                    </MDBBtn>
                </Col>
            </Row>
            </Container>
        );
    }

    render() {
        return(
            <div id="AddSong">
            <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
            {this.state.processing ? <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner> : this.renderForm()}
            </div>
        );
    }
};

export default AddSong;