import React, { Component } from 'react';
import './AddSong.css';

import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//Services Imports
import userSongServices from '../../services/UserServices/userSongsServices';

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
        console.log(this.state.request);
        userSongServices.addSong({ playlist_id: this.state.playlistData.playlist_id, request: this.state.request })
        .then(result => {
            document.querySelector("#AddSong-Form").reset();
            if(result.data.error) return this.handleError(result.data.error);
            this.setState({ formSuccess: true, fsSongTitle: result.data.data.title }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
            this.props.getSongs();
        })
        .catch(err => console.error(err));
    }

    handleError(err) {
        if(err === "Duplicate")
            return this.setState({ formFailure: true, failureReason: "No Duplicates" }, () => setTimeout(() => this.setState({ formFailure: true }), 2000));
    }

    renderSuccess() {
        return(
            <Col lg={4}>
                <Alert variant="success" style={{ marginTop: "25px" }}>
                {this.state.fsSongTitle} was added!
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
            <div id="AddSong">
            <Container>
            <Row>
                <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Form id="AddSong-Form" onSubmit={this.handleSubmit} autoComplete="off">
                <Form.Group>
                    <Form.Row>
                    <Col lg={3}>
                    <Form.Label>Song Name: </Form.Label>
                    </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={8}>
                        <Form.Control 
                        id="AddSong-SongName" 
                        type="text" 
                        name="request"
                        onChange={this.handleChange}
                        />
                        </Col>
                        <Col lg={4}>
                        <Button id="AddSong-SubmitButton" variant="primary" type="submit">
                        Add
                        </Button>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={6}>
                        <Form.Text>
                        YouTube Search Request or Link.
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

export default AddSong;