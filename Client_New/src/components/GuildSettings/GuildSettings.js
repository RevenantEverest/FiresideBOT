import React, { Component } from 'react';
import './GuildSettings.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBInput, MDBTooltip, MDBBtn, toast, ToastContainer } from 'mdbreact';

//Services Imports
import guildServices from '../../services/GuildServices/guildServices';

import Skin from '../../res/Skin';

class GuildSettings extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSettings();
    }

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings(), 2000);
        guildServices.getGuildSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();
        guildServices.updateSettings({ guild_id: this.state.manageServer.id, prefix: (this.state.prefix ? this.state.prefix : this.settings.prefix) })
        .then(() => {
            this.toggleSuccessNotify();
            this.getSettings();
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
        let errMessage = this.state.failureReason ? `Error: ${this.state.failureReason}` : "Error";
        return toast.error(errMessage, {
            position: "top-right",
            autoClose: 5000       
        });;
    }

    renderSettings() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container fluid>
                <Row>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={2} style={{ paddingRight: 0 }}>
                            <label>Prefix</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The desired prefix before any command. (Default: ?)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="GuildSettings-Prefix-Col">
                            <MDBInput 
                            name="prefix"
                            hint={this.state.settings.prefix} 
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="md" onSubmit={this.handleSubmit}>Update</MDBBtn>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    render() {
        return(
            <div id="GuildSettings">
                <Container>
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}  
                    newestOnTop
                    rtl={false} 
                    />
                <Row>
                    <Col>
                    {this.state.dataReceived ? this.renderSettings() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default GuildSettings;