import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Economy.css';

import { Container, Row, Col, Table, Button, Image, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//services imports
import currencyServices from '../../services/currencyServices';

class Economy extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getDiscordCurrency();
    }

    componentWillUnmount() { this._isMounted = false; }

    getDiscordCurrency() {
        if(!this._isMounted) return setTimeout(() => this.getDiscordCurrency(), 2000);
        if(!this.state.manageServer) return;
        currencyServices.getByGuildId(this.state.manageServer.id)
        .then(currency => this.setState({ currencyData: currency.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    deleteRecord(el) {
        currencyServices.deleteRecord(el.id)
            .then(() => this.getDiscordCurrency())
            .catch(err => console.error(err));
    }

    handleSettingsRedirect = () => this.setState({ settingsRedirect: true });

    renderCurrency() {
        console.log(this.state.currencyData)
        let Currency = this.state.currencyData.map((el, idx) => {
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
            <Table striped bordered hover variant="dark" id="Economy-Table">
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
        );
    }

    renderSettingsButton() {
        return(
            <Button className="Economy-SettingsButton " onClick={() => this.handleSettingsRedirect()}>
                <FontAwesomeIcon icon="cog" style={{ marginRight: "2%" }}/>
                Settings
            </Button>
        );
    }

    render() {
        return(
            <div id="Economy">
                <Container fluid id="Economy-ContainerMain">
                    <Container className="Economy-Container">
                    <Row>
                        <Col>
                            <h1 className="Component-Header">Economy</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                            <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Economy</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-end">
                        {this.state.dataReceived ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                        {this.state.dataReceived ? this.renderSettingsButton() : ''}
                    </Row>
                    <Row>
                        <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        {this.state.dataReceived ? this.renderCurrency() : ''}
                        </Col>
                    </Row>
                    </Container>
                </Container>
                {this.state.settingsRedirect ? <Redirect to="/economy/settings" /> : ''}
            </div>
        );
    }
};

export default Economy;