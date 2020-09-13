import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class UserProfiles extends Component {

    _Routes = [
        { to: "/profiles/user", pathname: "Profiles" },
        { main: true, pathname: "User" }
    ];

    render() {
        return(
            <div id="UserProfiles">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <Row>
                    <Col>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default UserProfiles;