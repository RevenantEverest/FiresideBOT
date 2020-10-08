import React, { Component } from 'react';
import '../css/CommandLogs.css';

import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

import Breadcrumb from '../sections/Breadcrumb';
import Spinner from '../sections/Spinner';
import CommandLogsTable from '../sections/CommandLogsTable';

import commandLogServices from '../../services/commandLogServices';

class CommandLogs extends Component {

    _isMounted = false;

    _Routes = [
        { to: "/logs/command", pathname: "Logs" }, 
        { main: true, pathname: "Command" }
    ];

    columns = [
        {
            label: 'ID',
            field: 'id',
            width: 50,
            sort: 'desc',
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'ID',
            },
        },
        { label: 'Command', field: 'command', width: 50 },
        { label: 'Args', field: 'args', width: 50 },
        { label: 'Discord ID', field: 'discord_id', width: 60 },
        { label: 'Guild ID', field: 'guild_id', width: 60 },
        { label: 'Date', field: 'date', sort: 'disabled', width: 60 },
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        this.getLogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    getLogs() {
        if(!this._isMounted) return;
        commandLogServices.getCommandLogs()
        .then(logs => this.setState({ logs: logs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderLogs() {
        let rows = this.state.logs.map((el, idx) => {
            return {
                id: parseInt(el.id, 10),
                command: el.command,
                args: el.args,
                discord_id: <MDBBtn color="elegant" size="md">{el.discord_id}</MDBBtn>,
                guild_id: <MDBBtn color="elegant" size="md">{el.guild_id}</MDBBtn>,
                date: el.date
            }
        });
        return(
            <Row className="mt-4 mb-5">
                <Col>
                <CommandLogsTable data={{ columns: this.columns, rows: rows }} />
                </Col>
            </Row>
        );
    }

    render() {
        return(
            <div id="CommandLogs" className="app-page">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                {this.state.dataReceived ? this.renderLogs() : <Spinner className="mt-4" dataReceived={this.state.dataReceived} />}
                </Container>
            </div>
        );
    }
};

export default CommandLogs;