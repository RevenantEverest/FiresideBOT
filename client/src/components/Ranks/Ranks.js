import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Ranks.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap';

//Services Imports
import rankServices from '../../services/rankServices';

class Ranks extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.userData
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getRanks();
    }

    componentWillUnmount = () => this._isMounted = false;

    getRanks() {
        if(!this._isMounted) return setTimeout(() => this.getRanks(), 2000);
        rankServices.getGuildRanks(this.state.manageServer.id)
        .then(ranks => this.setState({ rankData: ranks.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleSettingsRedirect = () => this.setState({ settingsRedirect: true });

    renderRanks() {
        let Ranks = this.state.rankData.map((el, idx) => {
            return(
                <tr key={idx}>
                    <td className="Ranks-TD Ranks-TD-#">{idx + 1}</td>
                    <td className="Ranks-TD Ranks-TD-Username">{el.discord_username}</td>
                    <td className="Ranks-TD Ranks-TD-Rank">{el.rank_number} ({el.rank_name})</td>
                    <td className="Ranks-TD Ranks-TD-XP">{el.xp}</td>
                </tr>
            );
        });

        return(
            <Table striped bordered hover variant="dark" id="Ranks-Table">
            <thead>
                <tr>
                <th className="Ranks-TH">#</th>
                <th className="Ranks-TH">Username</th>
                <th className="Ranks-TH">Rank</th>
                <th className="Ranks-TH">XP</th>
                </tr>
            </thead>
            <tbody>
                {Ranks}
            </tbody>
            </Table>
        );
    }

    renderSettingsButton() {
        return(
            <Button className="Ranks-SettingsButton " onClick={() => this.handleSettingsRedirect()}>
                <FontAwesomeIcon icon="cog" style={{ marginRight: "2%" }}/>
                Settings
            </Button>
        );
    }

    render() {
        return(
            <div id="Ranks">
            <Container fluid id="Ranks-ContainerMain">
                <Container className="Ranks-Container">
                <Row>
                    <Col>
                        <h1 className="Component-Header">Ranks</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Ranks</p>
                    </Col>
                </Row>
                <Row className="justify-content-md-end">
                    {this.state.dataReceived ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    {this.state.dataReceived ? this.renderSettingsButton() : ''}
                </Row>
                <Row>
                    <Col>
                    {this.state.dataReceived ? this.renderRanks() : ''}
                    </Col>
                </Row>
                </Container>
            </Container>
            {this.state.settingsRedirect ? <Redirect to="/ranks/settings" /> : ''}
            </div>
        );
    }
};

export default Ranks;