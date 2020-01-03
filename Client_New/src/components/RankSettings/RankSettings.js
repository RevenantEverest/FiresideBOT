import React, { Component } from 'react';
import './RankSettings.css';

import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { MDBRangeInput, MDBTooltip, MDBBtn } from 'mdbreact';

//Services Imports
import rankServices from '../../services/rankServices';

import Skin from '../../res/Skin';

class RankSettings extends Component {

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

    componentWillUnmount = () => this._isMounted = false;

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings, 2000);
        if(!this.state.manageServer) return;
        rankServices.getRankSettings(this.state.manageServer.id)
        .then(settings => this.setState({ settings: settings.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.general_increase_rate)
            if(!Number.isInteger(parseInt(this.state.general_increase_rate, 10)))
            return this.setState({ formFailure: true, failureReason: "General Increase Rate must be a number"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.general_increase_rate, 10) <= 0)
            return this.setState({ formFailure: true, failureReason: "General Increase Rate must be above 0"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        if(this.state.complexity)
            if(!Number.isInteger(parseInt(this.state.complexity, 10)))
            return this.setState({ formFailure: true, failureReason: "Complexity must be a number"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.complexity, 10) <= 0)
            return this.setState({ formFailure: true, failureReason: "Complexity must be above 0"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));
            else if(parseInt(this.state.complexity, 10) > 10)
            return this.setState({ formFailure: true, failureReason: "Complexity must be 10 or below"}, () => setTimeout(() => this.setState({ formFailure: false }), 2000));

        rankServices.updateRankSettings({
            guild_id: this.state.manageServer.id, 
            general_increase_rate: (this.state.general_increase_rate ? this.state.general_increase_rate : this.state.settings.general_increase_rate)
        })
        .then(() => {
            this.getSettings();
            this.setState({ formSuccess: true }, () => setTimeout(() => this.setState({ formSuccess: false }), 2000));
        })
        .catch(err => console.error(err));
    }

    renderSettings() {
        return(
            <form onSubmit={this.handleSubmit}>
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
                            onChange={this.handleChange}
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

    renderSuccess() {
        return(
            <Col lg={4}>
                <Alert variant="success" style={{ marginTop: "25px" }}>
                Settings Updated!
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formSuccess: false })} />
                </Alert>    
            </Col>
        );
    }

    renderFailure() {
        return(
            <Col lg={4}>
                <Alert variant="danger" style={{ marginTop: "25px" }}>
                {this.state.failureReason}
                <FontAwesomeIcon className="FontAwesomeIcon AddPlaylist-Alert-Close" icon="times" onClick={() => this.setState({ formFailure: false })} />
                </Alert>    
            </Col>
        );
    }

    render() {
        return(
            <div id="RankSettings" style={{ minHeight: this.props.location.pathname === "/ranks/settings" ? "65vh" : "" }}>
            <Container>
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