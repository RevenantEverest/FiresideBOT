import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Ranks.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Button, Image, Spinner } from 'react-bootstrap';

//Services Imports
import rankServices from '../../services/rankServices';

class Ranks extends Component {

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
        this.getSettings();
    }

    componentWillUnmount = () => this._isMounted = false;

    getSettings() {
        if(!this._isMounted) return setTimeout(() => this.getSettings(), 2000);
        if(!this.state.manageServer) return;
        rankServices.getRankSettings(this.state.manageServer.id)
        .then(settings => this.getRanks(settings.data.data))
        .catch(err => console.error(err));
    }

    getRanks(settings) {
        rankServices.getGuildRanks(this.state.manageServer.id)
        .then(ranks => this.getRecords(settings, ranks.data.data))
        .catch(err => console.error(err));
    }

    getRecords(settings, ranks) {
        rankServices.getGuildRankRecords(this.state.manageServer.id)
        .then(records => this.setState({ settings: settings, ranks: ranks, records: records.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleSettingsRedirect = () => this.setState({ settingsRedirect: true });
    handleTiersRedirect = () => this.setState({ tiersRedirect: true });

    calculateLevel(complexity, exp) {
        let constA = (complexity / 1.15);
        let constB = (complexity / -0.25);
        let constC = (complexity * (complexity + 3));
        let Level = Math.max( Math.floor( constA * Math.log(exp + constC ) + constB ), 1);
        return Level;
    }

    renderRanks() {
        let settings = this.state.settings;
        let ranks = this.state.ranks;
        let Records = this.state.records.map((el, idx) => {
            if(ranks.length <= 0) return(<tr key={idx}></tr>);
            if(!el.xp) return(<tr key={idx}></tr>)
            let Level = this.calculateLevel(settings.complexity, (parseInt(el.xp, 10)));
            let RankName = ranks.length <= Level ?  ranks[ranks.length - 1].rank_name : ranks.filter(el => el.rank_number === Level)[0].rank_name;
            if(!Number.isInteger(parseInt(Level, 10))) return(<tr key={idx}></tr>);
            return(
                <tr key={idx}>
                    <td className="Ranks-TD Ranks-TD-#">{idx + 1}</td>
                    <td className="Ranks-TD Ranks-TD-Username">
                        <Image 
                        className="Ranks-TD-Username-Image" 
                        src={(el.avatarUrl ? `https://cdn.discordapp.com/avatars/${el.discord_id}/${el.avatarUrl}.png` : "https://i.imgur.com/c26Syzn.jpg")}
                        roundedCircle
                        />
                        {el.discord_username}
                    </td>
                    <td className="Ranks-TD Ranks-TD-Rank">{RankName}</td>
                    <td className="Ranks-TD Ranks-TD-Tier">{Level > ranks.length ? ranks.length : Level.toLocaleString()}</td>
                    <td className="Ranks-TD Ranks-TD-XP">{parseInt(el.xp, 10).toLocaleString()}</td>
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
                <th className="Ranks-TH">Tier</th>
                <th className="Ranks-TH">EXP</th>
                </tr>
            </thead>
            <tbody>
                {Records}
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

    renderEditRanksButton() {
        return(
            <Button className="Ranks-TiersButton " onClick={() => this.handleTiersRedirect()}>
                <FontAwesomeIcon icon="edit" style={{ marginRight: "2%" }}/>
                Edit Rank Tiers
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
                    {this.state.dataReceived ? this.renderEditRanksButton() : ''}
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
            {this.state.tiersRedirect ? <Redirect to="/ranks/tiers" /> : ''}
            </div>
        );
    }
};

export default Ranks;