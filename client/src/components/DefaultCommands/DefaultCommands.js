import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DefaultCommands.css';

import { Container, Row, Col, Table, Spinner} from 'react-bootstrap';

//Services Imports
import commandServices from '../../services/commandServices';

class DefaultCommands extends Component {

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
        this.getCommands();
    }

    componentWillUnmount = () => this._isMounted = false;

    getCommands() {
        if(!this._isMounted) return setTimeout(() => this.getCommands(), 2000);

        commandServices.getDefaultCommands()
        .then(commands => this.setState({ commands: commands.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderCommands() {
        const categories = ['Admin', 'Economy', 'Fun', 'GameStats', 'Info', 'Music', 'Other', 'Support'];
        let temp = [];
        categories.forEach(category => {
            let Commands = this.state.commands.filter(el => el.category === category).map((el, idx) => {
                return(
                    <tr key={idx}>
                        <td className="DefaultCommands-TD DefaultCommands-TD-Command">
                        <a className="DefaultCommands-TD-Command-Link" target="_blank" rel="noopener noreferrer" href={`https://help.firesidebot.com/commands/${el.name}`}>
                        {el.d_name}
                        </a>
                        </td>
                        <td className="DefaultCommands-TD DefaultCommands-TD-Description">{el.desc}</td>
                        <td className="DefaultCommands-TD DefaultCommands-TD-Category">{el.category}</td>
                    </tr>
                );
            });

            temp.push(
                <Row>
                    <Col>
                        <Row>
                            <h1 style={{ fontWeight: "600", fontSize: "20px", marginLeft: "10px" }}>{category}</h1>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                        <Table striped bordered hover variant="dark" id="DefaultCommands-Table">
                        <thead>
                            <tr>
                            <th className="DefaultCommands-TH">Command</th>
                            <th className="DefaultCommands-TH">Description</th>
                            <th className="DefaultCommands-TH">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Commands}
                        </tbody>
                        </Table>
                        </Row>
                    </Col>
                </Row>
            )
        });

        return(temp);
    }

    render() {
        return(
            <div id="DefaultCommands">
            <Container fluid id="DefaultCommands-ContainerMain">
                <Container className="DefaultCommands-Container">
                <Row>
                    <Col>
                        <h1 className="Component-Header DefaultCommands-Header">Default Commands</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="DefaultCommands-BreadCrumb">
                        <Link to="/"><p className="Component-Breadcrumb">Home / Commands </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Default</p>
                    </Col>
                </Row>
                <Row className="Component-Content DefaultCommands-Content">
                    <Col>
                    {this.state.dataReceived ? this.renderCommands() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>   
                </Container>
            </Container>
            </div>
        );
    }
};

export default DefaultCommands;