import React, { Component } from 'react';
import './AddRank.css';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

//Services Imports
import rankServices from '../../services/rankServices';

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
        rankServices.addRank({ guild_id: this.state.manageServer.id, rank_name: this.state.rank_name })
        .then(rank => {
            document.querySelector('#AddRank-Form').reset();
            this.props.getRankTiers();
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
                    <Form id="AddRank-Form" onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                        <Form.Row>
                        <Col lg={2}>
                        <Form.Label>Rank Name: </Form.Label>
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
                            <Col>
                            <Button id="AddRank-SubmitButton" variant="primary" type="submit">
                            Create
                            </Button>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={2}>
                            <Form.Text>
                            Desired name for a rank.
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