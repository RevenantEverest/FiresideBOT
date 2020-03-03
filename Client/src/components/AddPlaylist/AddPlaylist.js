import React, { Component } from 'react';
import './AddPlaylist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBInput,
    MDBTooltip,
    MDBBtn,
    toast, 
    ToastContainer 
} from 'mdbreact';

import userPlaylistServices from '../../services/UserServices/userPlaylistServices';

import Skin from '../../res/Skin';

class AddPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            playlistNames: this.props.playlistNames
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();

        if(!this.state.name) return this.toggleFailureNotify("No empty fields");

        if(this.state.name.split("").includes(" "))
            return this.toggleFailureNotify("No White Space Allowed");
        else if(this.state.playlistNames.includes(this.state.name))
            return this.toggleFailureNotify("Playlist Already Exists");
        else if(this.state.playlistNames.length >= 5)
            return this.toggleFailureNotify("Playlists Limited to 5");
        
        userPlaylistServices.addPlaylist({ discord_id: this.state.userData.discord_id, name: this.state.name, public: true })
        .then(() => {
            document.querySelector("#AddPlaylist-Form").reset();
            this.toggleSuccessNotify();
            this.props.getPlaylists();
        })
        .catch(err => console.error(err));
    }

    toggleSuccessNotify = () => toast.success("Added Successfully", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = (reason) => toast.error(`ERROR: ${reason}`, { position: "top-right", autoClose: 5000 });

    render() {
        return(
            <div id="AddPlaylist">
                <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
                <form id="AddPlaylist-Form" onSubmit={this.handleSubmit}>
                <Container fluid>
                <Row style={{ marginBottom: "2%" }}>
                    <Col lg={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={6} style={{ paddingRight: 0 }}>
                            <label>Playlist Name</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Desired name for a playlist. (No White Space)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={12} id="AddPlaylist-Name-Col">
                            <MDBInput 
                            name="name"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex, margin: 0 }} size="md" onClick={this.handleSubmit}>Create</MDBBtn>
                    </Col>
                </Row>
                </Container>
                </form>
            </div>
        );
    }
};

export default AddPlaylist;