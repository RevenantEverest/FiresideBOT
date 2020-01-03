import React, { Component } from 'react';
import './AddPlaylist.css';

import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';

//Services Imports
import userPlaylistServices from '../../services/UserServices/userPlaylistServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        if(this.state.name.split("").includes(" "))
        return this.setState({ formFailure: true, failureReason: "No White Space allowed in playlist names " }, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
        else if(this.state.playlistNames.includes(this.state.name))
        return this.setState({ formFailure: true, failureReason: "Playlist Already Exists" }, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
        else if(this.state.playlistNames.length >= 5)
        return this.setState({ formFailure: true, failureReason: "Playlists Limited to 5" }, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
        
        userPlaylistServices.addPlaylist({ discord_id: this.state.userData.discord_id, name: this.state.name, public: true })
        .then(() => {
            document.querySelector("#AddPlaylist-Form").reset();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000))
            this.props.getPlaylists();
        })
        .catch(err => console.error(err));
    }

    renderSuccess() {
        return(
            <Col lg={4}>
                <Alert variant="success" style={{ marginTop: "25px" }}>
                Playlist Created!
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formSuccess: false })} />
                </Alert>    
            </Col>
        );
    }

    renderFailure() {
        return(
            <Col lg={4}>
                <Alert variant="danger" style={{ marginTop: "25px" }}>
                {this.state.failureReason}
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formFailure: false })} />
                </Alert>    
            </Col>
        );
    }

    render() {
        return(
            <div id="AddPlaylist">
            <Container>
            <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Form id="AddPlaylist-Form" onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                        <Form.Row>
                        <Col lg={2}>
                        <Form.Label>Playlist Name: </Form.Label>
                        </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={2}>
                            <Form.Control 
                            id="AddPlaylist-PlaylistName" 
                            type="text" 
                            name="name"  
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col lg={3}>
                            <Button id="AddPlaylist-UpdateButton" variant="primary" type="submit">
                            Create
                            </Button>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={2}>
                            <Form.Text>
                            Desired name for a playlist. (No White Space)
                            </Form.Text>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    </Form>
                </Col>
                {this.state.formSuccess ? this.renderSuccess() : ''}
                {this.state.formFailure ? this.renderFailure() : ''}
            </Row>
            </Container>
            </div>
        );
    }
};

export default AddPlaylist;