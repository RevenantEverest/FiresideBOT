import React, { Component } from 'react';
import './CommandLogs.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MDBDataTable, MDBIcon } from 'mdbreact';

import commandLogServices from '../../services/commandLogServices';

class CommandLogs extends Component {

    _isMounted = false;

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
        .then(logs => this.setState({ logs: logs.data.data.reverse(), dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderTable() {
        let Columns = [
            { label: "#", field: "index", sort: "asc", width: 80 },
            { label: "ID", field: "id", sort: "asc", width: 80 },
            { label: "Command", field: "command", sort: "asc", width: 100 },
            { label: "Args", field: "args", sort: "asc", width: 120 },
            { label: "Discord ID", field: "discord_id", sort: "asc", width: 100 },
            { label: "Guild ID", field: "guild_id", sort: "asc", width: 100 },
            { label: "Date", field: "date", sort: "asc", width: 120 },
        ];
        let Logs = this.state.logs.map((el, idx) => {
            return { index: idx + 1, id: el.id, command: el.command, args: el.args, discord_id: el.discord_id, guild_id: el.guild_id, date: el.date };
        });

        return <MDBDataTable striped hover data={{ columns: Columns, rows: Logs }} id="CommandLogs-Table" />
    }

    render() {
        return(
            <div id="CommandLogs">
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Command Logs</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Logs</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.state.dataReceived ? this.renderTable() : <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default CommandLogs;