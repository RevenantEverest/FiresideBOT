import React, { Component } from 'react';
import './AddRank.css';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

class AddRank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    handleSubmit(e) {
        e.preventDefault();
        rankServices.addRank({ guild_id: this.state.manageServer.id, rank_name: this.state.rank_name, rank_number: this.state.rank_number })
        .then(rank => {
            document.querySelector('#AddRank-Form').reset();
            this.props.getRanks();
        })
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="AddRank">
            <Container fluid id="AddRank-ContainerMain">
                <Container className="AddRank-Container">
                <Row>
                    <Col>
                    <Form id="AddRank-Form" onSubmit={this.handleSubmit} autoComplete="off" fluid>
                    <Form.Group controlId="formBasicsUsername">
                        <Form.Row>
                        <Col lg={2}>
                        <Form.Label>Currency Name: </Form.Label>
                        </Col>
                        <Col lg={2}>
                        <Form.Label>Increase Rate: </Form.Label>
                        </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={2}>
                            <Form.Control 
                            id="AddRank-RankName" 
                            type="text" 
                            name="rank_name"
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col lg={2}>
                            <Form.Control 
                            id="AddRank-RankNumber" 
                            type="text" 
                            name="rank_number" 
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col>
                            <Button id="AddRank-SubmitButton" variant="primary" type="submit">
                            Update
                            </Button>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={2}>
                            <Form.Text>
                            Desired name for a rank.
                            </Form.Text>
                            </Col>
                            <Col lg={2}>
                            <Form.Text>
                            Desired rank position.
                            </Form.Text>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
                    </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default AddRank;