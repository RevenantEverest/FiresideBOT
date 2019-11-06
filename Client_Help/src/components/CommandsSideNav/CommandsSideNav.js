import React, { Component } from 'react';
import './CommandsSideNav.css';

import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

import Skin from '../../res/Skin';

class CommandsSideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCategories() {
        let _categories = this.props.commands.map(el => el.category);
        _categories = _categories.filter((el, idx) => _categories.indexOf(el) === idx);
        let Categories = _categories.map((el, idx) => {
            return(
                <Row key={idx} className="justify-content-md-center text-center" style={{ marginBottom: "2%" }}>
                    <Col>
                    <MDBBtn color={Skin.MDBColor} className="Button" style={{ width: "150px" }}>{el}</MDBBtn>
                    </Col>
                </Row>
            );
        });

        return Categories;
    }

    render() {
        return(
            <div id="CommandsSideNav">
                <Container fluid style={{ background: "#1a1a1a", marginTop: "10%", paddingBottom: "5%" }}>
                <Row className="justify-content-md-center text-center" style={{ marginBottom: "10%", paddingTop: "10%" }}>
                    <Col>
                    <h2 className="h2">Categories</h2>
                    </Col>
                </Row>
                    {this.renderCategories()}
                </Container>
            </div>
        );
    }
};

export default CommandsSideNav;