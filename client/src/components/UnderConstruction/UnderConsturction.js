import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

class UnderConstruction extends Component {

    render() {
        return(
            <div id="UnderConstruction">
                <Container>
                <Row className="justify-content-lg-center">
                    <Col>
                    <div style={{ margin: "auto", width: "50%" }}>
                    <Image src="https://i.imgur.com/3jLRzEZ.png" style={{ width: "100%" }} />
                    </div>
                    </Col>
                </Row>
                <Row className="text-center" style={{ marginBottom: "5%" }}>
                    <Col>
                        <h1 className="h1" style={{ fontWeight: 800 }}>This Area Is Currently Under Construction</h1>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default UnderConstruction;