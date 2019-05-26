import React, { Component } from 'react';
import './AddSong.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class AddSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.state.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
    }


    render() {
        return(
            <div id="AddSong">
                <Container fluid id="AddSong-ContainerMain">
                <Row>
                <Col>
                </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default AddSong;