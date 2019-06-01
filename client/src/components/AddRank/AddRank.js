import React, { Component } from 'react';
import './AddRank.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';

//Services Imports
import rankServices from '../../services/rankServices';

class AddRank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            ranks: this.props.ranks
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    handleSubmit(e) {
        e.preventDefault();

        if(this.state.ranks.length >= 20)
        return this.setState({ formFailure: true, failureReason: "Ranks limited to 20" }, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        rankServices.addRank({ guild_id: this.state.manageServer.id, rank_name: this.state.rank_name })
        .then(rank => {
            let ranks = this.state.ranks;
            ranks.push(rank);
            document.querySelector('#AddRank-Form').reset();
            this.props.getRankTiers();
            this.setState({ ranks: ranks, formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
        })
        .catch(err => console.error(err));
    }

    renderSuccess() {
        return(
            <Col lg={4}>
                <Alert variant="success" style={{ marginTop: "25px" }}>
                Rank Created!
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
            <div id="AddRank">
            <Container fluid id="AddRank-ContainerMain">
                <Container className="AddRank-Container">
                <Row>
                    <Col>
                    <Form id="AddRank-Form" onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Group>
                        <Form.Row>
                        <Col lg={3}>
                        <Form.Label>Rank Name: </Form.Label>
                        </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={3}>
                            <Form.Control 
                            id="AddRank-RankName" 
                            type="text" 
                            name="rank_name"
                            onChange={this.handleChange}
                            />
                            </Col>
                            <Col lg={1}>
                            <Button id="AddRank-SubmitButton" variant="primary" type="submit">
                            Create
                            </Button>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg={3}>
                            <Form.Text>
                            Desired name for a rank.
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
            </Container>
            </div>
        );
    }
};

export default AddRank;