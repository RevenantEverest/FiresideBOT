import React, { Component } from 'react';
import './EconomySettings.css';

import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBInput, MDBRangeInput, MDBBtn, MDBTooltip, ToastContainer, toast } from 'mdbreact';

import currencyServices from '../../../services/currencyServices';

import Skin from '../../../res/Skin';

class EconomySettings extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSettings();
    }

    componentWillUnmount = () => this._isMounted = false;

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings(), 2000);
        currencyServices.getSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleValueChange = (value) => this.setState({ currency_increase_rate: value });

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.currency_increase_rate)
        if(!Number.isInteger(parseInt(this.state.currency_increase_rate, 10)))
        return this.setState({ failureReason: "Increase Rate must be a number"}, () => this.toggleFailureNotify());
        else if(parseInt(this.state.currency_increase_rate, 10) <= 0)
        return this.setState({ failureReason: "Increase Rate must be above 0"}, () => this.toggleFailureNotify());

        currencyServices.updateSettings({
            guild_id: this.state.manageServer.id, 
            currency_name: (this.state.currency_name ? this.state.currency_name : this.state.settings.currency_name), 
            currency_increase_rate: (this.state.currency_increase_rate ? this.state.currency_increase_rate : this.state.settings.currency_increase_rate) 
        })
        .then(() => {
            this.toggleSuccessNotify();
            this.getSettings();
        })
        .catch(err => console.error(err));
    }

    toggleSuccessNotify = () => toast.success("Updated Successfully", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = () => toast.error(`Error: ${this.state.failureReason}`, { position: "top-right", autoClose: 5000 });

    renderSettings() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Container fluid>
                <Row>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={6} style={{ paddingRight: 0 }}>
                            <label>Currency Name</label>
                        </Col>
                        <Col lg={6}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The desired name of your server currency. (Default: Kindling)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="EconomySettings-CurrencyName-Col">
                            <MDBInput 
                            name="currency_name"
                            hint={this.state.settings.currency_name} 
                            type="text" 
                            onChange={this.handleChange} 
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={8} style={{ paddingRight: 0 }}>
                            <label>Currency Increase Rate</label>
                        </Col>
                        <Col lg={4}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The rate at which currency is gained on a per message basis. (Default: 10)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="EconomySettings-CurrencyIncreaseRate-Col">
                            <MDBRangeInput
                            min={0}
                            max={100}
                            name="currency_increase_rate"
                            value={this.state.settings.currency_increase_rate}
                            formClassName="w-100"
                            getValue={this.handleValueChange}
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="md" onClick={this.handleSubmit}>Update</MDBBtn>
                    </Col>
                </Row>
                </Container>
            </form>
        );
    }

    renderBreadcrumb() {
        return(
            <div>
            <Row>
                <Col>
                    <h1 className="Component-Header">Economy</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/economy"><p className="Component-Breadcrumb">/ Economy </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Settings</p>
                </Col>
            </Row>
            </div>
        );
    }

    render() {
        return(
            <div id="EconomySettings" style={{ minHeight: this.props.location.pathname === "/economy/settings" ? "65vh" : "" }}>
                <Container>
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}  
                    newestOnTop
                    rtl={false} 
                    />
                {window.location.pathname === "/economy/settings" ? this.renderBreadcrumb() : ''}
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

export default withRouter(EconomySettings);