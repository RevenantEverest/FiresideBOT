import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    toast
} from 'mdbreact'

import ChangelogForm from './ChangelogForm';
import changelogServices from '../../services/changelogServices';

class CreateChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getValue = this.getValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    getValue = (value) => this.setState({ type: value });

    handleSubmit(e) {
        e.preventDefault();

        if(!this.state.content) return this.toggleFailureNotify("Content Field Cannot Be Empty");
        if(!this.state.version) return this.toggleFailureNotify("Version Field Cannot Be Empty");
        if(!this.state.type) return this.toggleFailureNotify("Type Field Cannot Be Empty");

        let data = {
            content: this.state.content,
            version: this.state.version,
            type: this.state.type
        };

        changelogServices.createWorkingChangelog(data)
        .then(() => {
            this.toggleSuccessNotify();
            this.props.toggle();
        })
        .catch(err => console.error(err));
    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });
    toggleSuccessNotify = () => toast.success("Created Successfully", { position: "top-center", autoClose: 5000 });

    render() {
        return(
            <Container>
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} fullHeight position="top">
                <MDBModalHeader style={{ background: "#2c2c2c", border: "thin solid #2c2c2c" }}>
                    Create Changelog
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                <form id="CreateModal" onSubmit={this.handleSubmit}>
                    <Container>
                    <ChangelogForm
                    className="mb-4 mt-4" 
                    content={this.state.content}
                    getValue={this.getValue} 
                    handleChange={this.handleChange} />
                    <Row>
                        <Col>
                        <MDBBtn color="elegant" size="md" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="elegant" className="Button-dark" size="md" onClick={this.handleSubmit}>Save</MDBBtn>
                        </Col>
                    </Row>
                    </Container>
                </form>
                </MDBModalBody>
            </MDBModal>
            </Container>
        );
    }
};

export default CreateChangelog;