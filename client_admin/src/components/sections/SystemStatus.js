import React, { Component } from 'react';
import '../css/SystemStatus.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn
} from 'mdbreact';

import Spinner from './Spinner';

import systemServices from '../../services/systemServices';

class SystemStatus extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getInfo();
    }

    componentWillUnmount = () => this._isMounted = false;

    getInfo() {
        if(!this._isMounted) return;
        systemServices.getProcessInfo()
        .then(info => this.setState({ info: info.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderStatus() {
        let Status = this.state.info.map((el, idx) => {
            let iconColor = "orange";
            if(el.status === "stopped") iconColor = "red";
            else if(el.status === "online") iconColor = "green";
            return(
                <tr key={idx}>
                    <td>
                        <FontAwesomeIcon className={`FontAwesomeIcon ss-${iconColor}`} icon="circle" />
                    </td>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.namespace}</td>
                    <td>{el.version}</td>
                    <td>{el.mode}</td>
                    <td>{el.pid}</td>
                    <td>{el.uptime}</td>
                    <td>{el.cpu}</td>
                    <td>{el.mem}</td>
                </tr>
            );
        });

        return(
            <Row>
            <Col>
                <MDBTable>
                <MDBTableHead color="deep-orange darken-4" textWhite>
                <tr>
                    <th>Status</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Namespace</th>
                    <th>Version</th>
                    <th>Mode</th>
                    <th>PID</th>
                    <th>Uptime</th>
                    <th>CPU Usage</th>
                    <th>Memory Usage</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                {Status}
                </MDBTableBody>
                </MDBTable>
            </Col>
            </Row>
        );
    }

    render() {
        return(
            <div className="SystemStatus">
                <Container fluid>
                <Row className="mb-4">
                    <Col>
                    <MDBBtn 
                    color="elegant"
                    className="ml-0"
                    size="sm"
                    onClick={() => this.componentDidMount()}>
                        Reload
                    </MDBBtn>
                    </Col>
                </Row>
                {this.state.dataReceived ? this.renderStatus() : <Spinner dataReceived={this.state.dataReceived} />}
                </Container>
            </div>
        );
    }
};

export default SystemStatus;