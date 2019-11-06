import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

import { Container, Row, Col } from 'react-bootstrap';
import { 
    MDBCol, 
    MDBJumbotron, 
    MDBCardTitle, 
    MDBBtn, 
    MDBCard,
    MDBCardBody,
    MDBCardText
} from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skin from '../../res/Skin';

class HomePage extends Component {

    render() {
        return(
            <div id="HomePage">
                <Container fluid>
                <Row>
                    <Col>
                    <MDBJumbotron style={{ padding: 0 }} fluid style={{ background: "inherit" }}>
                        <MDBCol className="text-white text-center" style={{ backgroundImage: `url(https://i.imgur.com/r7kBhso.jpg)` }}>
                        <MDBCol className="py-5">
                            <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">FiresideBOT Help Docs</MDBCardTitle>
                            <p className="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                            optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                            </p>
                            <Link to="/commands">
                            <MDBBtn color={Skin.MDBColor} className="mb-5 Button">View Commands</MDBBtn>
                            </Link>
                        </MDBCol>
                        </MDBCol>
                    </MDBJumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MDBCard style={{ width: "22rem" }}>
                            <MDBCardBody style={{ background: "#1a1a1a" }}>
                            <MDBCardTitle>
                            <FontAwesomeIcon className="h1" icon="magic" />
                            </MDBCardTitle>
                            <MDBCardText tag="div" className="h5">
                            </MDBCardText>
                            <MDBBtn color={Skin.MDBColor} className="Button" href="#">Learn More</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default HomePage;