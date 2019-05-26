import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EditRanks.css';

import { Container, Row, Col, Spinner } from 'react-bootstrap';

//Component Imports
import AddRank from '../AddRank/AddRank';

//Services Imports
import rankServices from '../../services/rankServices';

class EditRanks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    render() {
        return(
            <div id="EditRanks">
            <Container id="EditRanks-ContainerMain">
                <Container className="EditRanks-Container">
                <Row>
                    <Col>
                    </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
}