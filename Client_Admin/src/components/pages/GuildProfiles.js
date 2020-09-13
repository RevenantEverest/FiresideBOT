import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';

class GuildProfiles extends Component {

    _Routes = [
        { to: "/profiles/guild", pathname: "Profiles" },
        { main: true, pathname: "Guild" }
    ];

    render() {
        return(
            <div id="GuildProfiles">
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

export default GuildProfiles;