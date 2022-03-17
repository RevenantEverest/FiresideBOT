import React, { Component } from 'react';
import './Economy.css';

import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { MDBBtn, MDBFormInline } from 'mdbreact';

//services imports
import currencyServices from '../../services/currencyServices';

import Skin from '../../res/Skin';

class Economy extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getDiscordCurrency();
    }

    componentWillUnmount = () => this._isMounted = false;

    getDiscordCurrency() {
        if(!this._isMounted) return setTimeout(() => this.getDiscordCurrency(), 2000);
        if(!this.state.manageServer) return;
        currencyServices.getByGuildId(this.state.manageServer.id)
        .then(currency => {
            currency = currency.data.data.filter(el => el.discord_username);
            this.setState({ currencyData: currency, dataReceived: true })
        })
        .catch(err => console.error(err));
    }

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    deleteRecord(el) {
        currencyServices.deleteRecord(el.id)
            .then(() => this.getDiscordCurrency())
            .catch(err => console.error(err));
    }

    handleSettingsRedirect = () => this.setState({ settingsRedirect: true });

    renderSpinner() {
        if(!this.state.dataReceived && this.props.manageServer)
            return <Row><Col><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></Col></Row>;
        else if(!this.state.manageServer)
            return(
                <Row>
                <Col lg={1} style={{ paddingRight: 0 }}>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                </Col>
                <Col style={{ paddingLeft: 0 }}>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
                </Col>
                </Row>
            );
    }

    renderCurrency() {
        let Currency = this.state.currencyData.filter(el => { return el.discord_username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            return(
                <tr key={idx}>
                    <td className="Economy-TD Economy-TD-#">{idx + 1}</td>
                    <td className="Economy-TD Economy-TD-Username">
                        <Image 
                        className="Economy-TD-Username-Image" 
                        src={(el.avatarUrl ? `https://cdn.discordapp.com/avatars/${el.discord_id}/${el.avatarUrl}.png` : "https://i.imgur.com/c26Syzn.jpg")}
                        roundedCircle
                        />
                        {el.discord_username}
                    </td>
                    <td className="Economy-TD Economy-TD-Amount">{el.currency}</td>
                    <td className="Economy-TD Economy-TD-Action">
                        <FontAwesomeIcon className="Economy-Icon-Trash" icon="trash-alt" onClick={() => this.deleteRecord(el)}/>
                    </td>
                </tr>
            );
        });

        return(
            <Row className="justify-content-sm-center justify-content-xs-center">
            <Col>
                <Table striped bordered hover variant="dark" id="Economy-Table" style={{ background: "#151515" }}>
                <thead>
                    <tr>
                    <th className="Economy-TH">#</th>
                    <th className="Economy-TH">Username</th>
                    <th className="Economy-TH">Amount</th>
                    <th className="Economy-TH">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Currency}
                </tbody>
                </Table>
            </Col>
            </Row>
        );
    }

    renderSettingsButton() {
        return(
            <Row style={{ marginBottom: "2%" }}>
            <Col lg={10} md={9} sm={8} xs={6}>
            <MDBFormInline className="md-form" style={{ marginTop: 0, marginBottom: 0 }}>
                <FontAwesomeIcon icon="search" style={{ marginRight: "2%" }}/>
                <input 
                className="form-control" 
                style={{ background: "transparent", color: "#cccccc", width: "140px" }} 
                type="text"
                name="search"
                placeholder="Search" 
                aria-label="Search"
                onChange={this.handleChange}
                />
            </MDBFormInline>
            </Col>
            <Col lg={2} md={2} sm={2} xs={6}>
            <MDBBtn color={Skin.hex} className="Button" size="md" style={{ background: Skin.hex, padding: "8px", width: "150px" }} onClick={() => this.handleSettingsRedirect()}>
                <FontAwesomeIcon icon="cog" style={{ marginRight: "2%" }} />
                Settings
            </MDBBtn>
            </Col>
            </Row>
        );
    }

    render() {
        return(
            <div id="Economy" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Economy</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Economy</p>
                    </Col>
                </Row>
                {this.state.dataReceived ? this.renderSettingsButton() : ''}
                {this.state.dataReceived ? this.renderCurrency() : this.renderSpinner()}
                </Container>
                {this.state.settingsRedirect ? <Redirect to="/economy/settings" /> : ''}
            </div>
        );
    }
};

export default Economy;