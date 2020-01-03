import React, { Component } from 'react';
import './AddRank.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBTooltip, MDBBtn, toast, ToastContainer } from 'mdbreact';

//Services Imports
import rankServices from '../../services/rankServices';

import Skin from '../../res/Skin';

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

    renderForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container fluid>
                <Row>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={5} style={{ paddingRight: 0 }}>
                            <label>Rank Name</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The desired name for a Rank Tier.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="AddRank-RankName-Col">
                            <MDBInput 
                            name="rank_name"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="md" onClick={this.handleSubmit}>Create</MDBBtn>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    render() {
        return(
            <div id="AddRank">
                <Container>
                <Row>
                    <Col>
                    {this.renderForm()}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default AddRank;