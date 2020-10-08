import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Breadcrumb from '../sections/Breadcrumb';
import Spinner from '../sections/Spinner';

import ServerQueueDetails from '../sections/ServerQueueDetails';
import ServerQueuesDisplay from '../sections/ServerQueuesDisplay';

import serversArrayServices from '../../services/serversArrayServices';

class MusicMonitor extends Component {

    _isMounted = false;

    _Routes = [
        { to: "/monitor/music", pathname: "Monitor" }, 
        { main: true, pathname: "Music" }
    ];

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getServersArray();
    }

    componentWillUnmount = () => this._isMounted = false;

    getServersArray() {
        if(!this._isMounted) return;
        serversArrayServices.index()
        .then(servers => this.setState({ servers: servers.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="MusicMonitor">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <Row className="mb-2">
                    <Col>
                    {this.state.dataReceived ? <ServerQueueDetails servers={this.state.servers} /> : <Spinner dataReceived={this.state.dataReceived} />}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.state.dataReceived ? <ServerQueuesDisplay servers={this.state.servers} /> : ""}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default MusicMonitor;