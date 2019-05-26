import React, { Component } from 'react';
import './Analytics.css';

import { Container, Row, Col } from 'react-bootstrap';

class Analytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    componentDidMount() {
        console.log(this.props.manageServer)
    }

    render() {
        return(
            <div id="Analytics">
                <Container>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Analytics;