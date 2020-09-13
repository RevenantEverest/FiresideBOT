import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBBtn,
    toast
} from 'mdbreact';

import ChangelogForm from './ChangelogForm';

import changelogServices from '../../services/changelogServices';

class EditChangelog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.changelog.content,
            version: this.props.changelog.version,
            type: this.props.changelog.type
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    handleSubmit(e) {
        e.preventDefault();
        let data = {
            id: this.props.changelog.id,
            content: this.state.content ? this.state.content : this.props.changelog.content,
            version: this.state.version ? this.state.version : this.props.changelog.version,
            type: this.state.type ? this.state.type : this.props.changelog.type
        };

        changelogServices.updateWorkingChangelog(data)
        .then(() => {
            this.toggleSuccessNotify();
            this.toggle();
            this.props.getWorkingChangelogs();
        })
        .catch(err => console.error(err));
    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });
    toggleSuccessNotify = () => toast.success("Edited Successfully", { position: "top-center", autoClose: 5000 });

    render() {
        return(
            <Container>
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle} fullHeight position="top">
                <MDBModalHeader style={{ background: "#2c2c2c", border: "thin solid #2c2c2c" }}>
                    Edit Changelog {this.props.changelog.version}
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                <form id="CreateModal" onSubmit={this.handleSubmit}>
                    <Container>
                    <ChangelogForm
                    className="mb-4 mt-4" 
                    changelog={this.props.changelog}
                    content={this.state.content}
                    version={this.state.version}
                    type={this.state.type}
                    getValue={this.getValue} 
                    handleChange={this.handleChange} />
                    <Row>
                        <Col>
                        <MDBBtn color="elegant" size="md" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="elegant" className="Button-dark" size="md" onClick={this.handleSubmit}>Update</MDBBtn>
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

export default EditChangelog;