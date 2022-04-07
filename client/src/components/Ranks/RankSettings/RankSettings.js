import React, { Component } from 'react';
import './RankSettings.css';

import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBRangeInput, MDBTooltip, MDBBtn, toast, ToastContainer } from 'mdbreact';

//Services Imports
import rankServices from '../../../services/rankServices';

import Skin from '../../../res/Skin';

class RankSettings extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.handleIncreaseRateValueChange = this.handleIncreaseRateValueChange.bind(this);
        this.handleComplexityValueChange = this.handleComplexityValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getSettings();
    }

    componentWillUnmount = () => this._isMounted = false;

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings, 2000);
        if(!this.state.manageServer) return;
        rankServices.getRankSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleIncreaseRateValueChange = (value) => this.setState({ general_increase_rate: parseInt(value, 10) });
    handleComplexityValueChange = (value) => this.setState({ complexity: parseInt(value, 10) });

    handleSubmit(e) {
        e.preventDefault();
        rankServices.updateRankSettings({
            id: this.state.settings.id,
            guild_id: this.state.manageServer.id, 
            general_increase_rate: (this.state.general_increase_rate ? this.state.general_increase_rate : this.state.settings.general_increase_rate),
            complexity: this.state.complexity ? this.state.complexity : this.state.settings.complexity,
            channel_id: this.state.channel_id ? this.state.channel_id : this.state.settings.channel_id
        })
        .then(() => {
            this.getSettings();
            this.toggleSuccessNotify();
        })
        .catch(err => console.error(err));
    }

    toggleSuccessNotify = () => toast.success("Updated Successfully", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = (reason) => toast.error(`ERROR: ${reason}`, { position: "top-right", autoClose: 5000 });

    renderSettings() {
        return(
            <form>
                <Container fluid>
                <Row>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={7} style={{ paddingRight: 0 }}>
                            <label>General Increase Rate</label>
                        </Col>
                        <Col lg={5}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The rate at which EXP is gained on a per message basis. (Default: 10)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="RankSettings-GeneralIncreaseRate-Col">
                            <MDBRangeInput
                            min={0}
                            max={100}
                            name="general_increase_rate"
                            value={this.state.settings.general_increase_rate}
                            formClassName="w-100"
                            getValue={this.handleIncreaseRateValueChange}
                            />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Complexity</label>
                        </Col>
                        <Col lg={5}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>The difficulty of each level with 1 being very easy and 10 being very hard. (Default: 2)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="RankSettings-Complexity-Col">
                            <MDBRangeInput
                            min={0}
                            max={10}
                            name="complexity"
                            value={this.state.settings.complexity}
                            formClassName="w-100"
                            getValue={this.handleComplexityValueChange}
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
                    <h1 className="Component-Header">Rank Settings</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/ranks"><p className="Component-Breadcrumb">/ Ranks </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Settings</p>
                </Col>
            </Row>
            </div>
        );
    }

    render() {
        return(
            <div id="RankSettings" style={{ minHeight: this.props.location.pathname === "/ranks/settings" ? "65vh" : "" }}>
            <Container>
            <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
            {window.location.pathname === "/ranks/settings" ? this.renderBreadcrumb() : ''}
            <Row>
                <Col>
                {this.state.manageServer ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                {this.state.dataReceived ? this.renderSettings() : ''}
                </Col>
                {this.state.formSuccess ? this.renderSuccess() : ''}
                {this.state.formFailure ? this.renderFailure() : ''}
            </Row>
            </Container>
            </div>
        );
    }
};

export default withRouter(RankSettings);