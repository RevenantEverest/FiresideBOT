import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBBtn
} from 'mdbreact';

class DeleteChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleDelete() {
        this.props.toggle();
        this.props.handleSubmit();
    }

    render() {
        return(
            <div className="DeleteChangelog">
            <Container>
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} centered>
                <MDBModalHeader style={{ background: "#2c2c2c", border: "thin solid #2c2c2c" }}>
                    Delete {this.props.type} v{this.props.changelog.version} {this.props.changelog.type}?
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                    <Container fluid>
                    <Row>
                        <Col>
                        <MDBBtn color="elegant" size="md" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="" className="Button-dark" size="md" onClick={() => this.handleDelete()}>Delete</MDBBtn>
                        </Col>
                    </Row>
                    </Container>
                </MDBModalBody>
            </MDBModal>
            </Container>
            </div>
        );
    }
};

export default DeleteChangelog;