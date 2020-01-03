import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Ranks.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { MDBBtn, MDBFormInline } from 'mdbreact';

//Services Imports
import rankServices from '../../services/rankServices';

import Skin from '../../res/Skin';

class Ranks extends Component {

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
        .then(records => {
            records = records.data.data.filter(el => el.discord_username);
            this.setState({ settings: settings, ranks: ranks, records: records, dataReceived: true })
        })
        .catch(err => console.error(err));
    }

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
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

    renderRanks() {
        let settings = this.state.settings;
        let ranks = this.state.ranks;
        let Records = this.state.records.filter(el => { return el.discord_username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
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
            <Row className="justify-content-sm-center justify-content-xs-center">
            <Col>
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
            </Col>
            </Row>
        );
    }

    renderSettingsButton() {
        return(
            <Row style={{ marginBottom: "2%" }}>
            <Col lg={8} md={8} sm={7} xs={6}>
                <MDBFormInline className="md-form" style={{ marginTop: 0, marginBottom: 0 }}>
                    <FontAwesomeIcon icon="search" style={{ marginRight: "2%" }}/>
                    <input 
                    className="form-control" 
                    style={{ background: "transparent", color: "#cccccc", width: "150px" }} 
                    type="text"
                    name="search"
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={this.handleChange}
                    />
                </MDBFormInline>
            </Col>
            <Col lg={2} md={2} sm={2} xs={3} style={{ paddingRight: 0 }}>
                <MDBBtn 
                color={Skin.hex} 
                className="Button"
                size="md"
                style={{ background: Skin.hex, padding: "8px", width: "150px" }} 
                onClick={() => this.handleTiersRedirect()}
                >
                    <FontAwesomeIcon icon="edit" style={{ marginRight: "2%" }}/>
                    Edit Rank Tiers
                </MDBBtn>
            </Col>
            <Col lg={2} md={2} sm={2} xs={3} style={{ paddingLeft: 0 }}>
                <MDBBtn 
                color={Skin.hex} 
                className="Button"
                size="md"
                style={{ background: Skin.hex, padding: "8px", width: "150px" }} 
                onClick={() => this.handleSettingsRedirect()}
                >
                    <FontAwesomeIcon icon="cog" style={{ marginRight: "2%" }}/>
                    Settings
                </MDBBtn>
            </Col>
            </Row>
        );
    }

    render() {
        return(
            <div id="Ranks" style={{ marginBottom: "5%" }}>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Ranks</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Ranks</p>
                    </Col>
                </Row>
                {this.state.dataReceived ? this.renderSettingsButton() : ''}
                {this.state.dataReceived ? this.renderRanks() : this.renderSpinner()}
                </Container>
            {this.state.settingsRedirect ? <Redirect to="/ranks/settings" /> : ''}
            {this.state.tiersRedirect ? <Redirect to="/ranks/tiers" /> : ''}
            </div>
        );
    }
};

export default Ranks;