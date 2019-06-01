import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RankTiers.css';

import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Component Imports
import AddRank from '../AddRank/AddRank';

//Services Imports
import rankServices from '../../services/rankServices';

class RankTiers extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer
        }
        this.getRankTiers = this.getRankTiers.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getRankTiers();
    }

    componentWillUnmount = () => this._isMounted = false;

    getRankTiers() {
        if(!this._isMounted) return setTimeout(() => this.getRankTiers(), 2000);
        if(!this.state.manageServer) return;
        rankServices.getGuildRanks(this.state.manageServer.id)
        .then(tiers => this.setState({ tiers: tiers.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    deleteTier(el) {
        rankServices.deleteRank(el.id)
        .then(() => this.getRankTiers())
        .catch(err => console.error(err));
    }

    renderRankTiers() {
        console.log(this.state.tiers)
        let RankTiers = this.state.tiers.map((el, idx) => {
            return(
                <tr key={idx}>
                    <td className="RankTiers-TD RankTiers-TD-RankNumber">{el.rank_number}</td>
                    <td className="RankTiers-TD RankTiers-TD-RankName">
                        {el.rank_name}
                    </td>
                    <td className="RankTiers-TD RankTiers-TD-Action">
                        <FontAwesomeIcon className="RankTiers-Icon-Trash" icon="trash-alt" onClick={() => this.deleteTier(el)}/>
                    </td>
                </tr>
            );
        });

        return(
            <Table striped bordered hover variant="dark" id="RankTiers-Table">
            <thead>
                <tr>
                <th className="RankTiers-TH">#</th>
                <th className="RankTiers-TH">Tier Name</th>
                <th className="RankTiers-TH">Action</th>
                </tr>
            </thead>
            <tbody>
                {RankTiers}
            </tbody>
            </Table>
        );
    }

    render() {
        return(
            <div id="RankTiers">
            <Container fluid id="RankTiers-ContainerMain">
                <Container className="RankTiers-Container">
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <h1 className="Component-Header">Rank Tiers</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                        <Link to="/"><p className="Component-Breadcrumb RankTiers-Breadcrumb">Home / Ranks </p></Link>
                        <Link to="/ranks"><p className="Component-Breadcrumb">/ Ranks </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Tiers</p>
                    </Col>
                </Row>
                <Row className=" Component-Content justify-content-md-end">
                    {this.state.dataReceived ? '' : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    {this.state.dataReceived ? <AddRank userData={this.state.userData} manageServer={this.state.manageServer} ranks={this.state.tiers} getRankTiers={this.getRankTiers} /> : ''}
                </Row>
                <Row>
                    <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    {this.state.dataReceived ? this.renderRankTiers() : ''}
                    </Col>
                </Row>
                </Container>
            </Container>
            </div>
        );
    }
};

export default RankTiers;