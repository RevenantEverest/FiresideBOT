import React, { Component } from 'react';
import './AddCustomCommand.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBTooltip,
    MDBInput,
    MDBBtn,
    toast, 
    ToastContainer
} from 'mdbreact';

import customCommandServices from '../../services/customCommandServices';
import Skin from '../../res/Skin';

class AddCustomCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            defaultCommands: this.props.defaultCommands
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            input: this.state.input,
            output: this.state.output,
            guild_id: this.state.manageServer.id,
            created_by: this.state.userData.discord_id
        };
        if(this.state.defaultCommands.map(el => el.name).includes(data.input.toLowerCase()))
            return;
        if([].concat.apply([], this.state.defaultCommands.map(el => el.aliases)).includes(data.input.toLowerCase()))
            return;
        customCommandServices.save(data)
        .then(() => {
            this.props.toggleModal();
            this.props.getCustomCommands();
        })
        .catch(err => console.error(err));
    }

    toggleSuccessNotify() {
        return toast.success("Updated Successfully", {
            position: "top-right",
            autoClose: 5000       
        });;
    }

    toggleFailureNotify() {
        return toast.error(`Error: ${this.state.failureReason}`, {
            position: "top-right",
            autoClose: 5000       
        });;
    }

    renderForm() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container fluid>
                <Row style={{ marginBottom: "5%" }}>
                    <Col lg={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={2} style={{ paddingRight: 0 }}>
                            <label>Input</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The desired name of your command.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={10} id="AddCustomCommand-Input-Col">
                            <MDBInput 
                            name="input"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Output</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The desired output of your command.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={10} id="AddCustomCommand-Output-Col">
                            <MDBInput 
                            name="output"
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={3} sm={3} xs={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <MDBBtn color="elegant" style={{ margin: 0 }} size="md" onClick={() => this.props.toggleModal()}>Close</MDBBtn>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex, margin: 0 }} size="md" onClick={this.handleSubmit}>Create</MDBBtn>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    render() {
        return(
            <div id="AddCustomCommand">
                <Container>
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}  
                    newestOnTop
                    rtl={false} 
                    />
                <Row>
                    <Col>
                    {this.renderForm()}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default AddCustomCommand;