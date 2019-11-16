import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Commands.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBadge, MDBFormInline } from 'mdbreact';

import CommandsSideNav from '../CommandsSideNav/CommandsSideNav';
import CommandInfo from '../CommandInfo/CommandInfo';
import Skin from '../../res/Skin';

class Command extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    renderCommands() {
        let commands = this.props.commands.filter(el => { return el.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; });
        let categories = commands.map(el => el.category);
        categories = categories.filter((el, idx) => categories.indexOf(el) === idx);
        let Commands = categories.map((el, idx) => {
            return(
                <Row key={idx} style={{ marginBottom: "5%" }} className="justify-content-sm-center">
                <Col>
                    <div style={{ marginBottom: "2%" }}>
                        <h1 className="h1">{el}</h1>
                        <MDBBadge color="dark" style={{ display: "inline", color: "orange" }}>{`<param>`}</MDBBadge>
                        <p className="h6" style={{ display: "inline" }}> indicates a required param and </p>
                        <MDBBadge color="dark" style={{ display: "inline", color: "orange" }}>{`[param]`}</MDBBadge>
                        <p className="h6" style={{ display: "inline" }}> indicates an optional param.</p>
                    </div> 
                    {
                        commands.filter(command => command.category === el).map((command, idxx) => {
                            return(
                                <Row key={idxx}style={{ marginBottom: "2%" }} className="justify-content-sm-center">
                                <Col>
                                    <MDBCard style={{ width: "22rem", borderLeft: `solid thick ${Skin.hex}` }}>
                                        <MDBCardBody style={{ background: "#1a1a1a" }}>
                                        <MDBCardTitle>
                                        <Link className="CommandLink" to={{
                                            pathname: `/commands/${command.name}`,
                                            state: { commandData: command }
                                        }}>
                                            {command.d_name} 
                                            {command.params ? <MDBBadge color="dark">{(command.params.required ? '<param>' : '[param]')}</MDBBadge> : ''}
                                        </Link>
                                        </MDBCardTitle>
                                        <MDBCardText tag="div" className="h5">
                                            <br />
                                            <p className="CommandText">Description: </p>
                                            {command.desc}
                                            {command.aliases.length > 0 ? <br /> : ''}
                                            {command.aliases.length > 0 ? <p className="CommandText">Aliases: </p> : ''}
                                            {command.aliases.length > 0 ? command.aliases.map((alias, idxxx) => <MDBBadge key={idxxx} color="dark" style={{ display: "inline" }}>{`${alias} `}</MDBBadge>) : ''}
                                            {command.params ? <br /> : ''}
                                            {command.params ? <p className="CommandText">Params: </p> : ''}
                                            {command.params ? command.params.params : ''}
                                            {command.flags ? <br /> : ''}
                                            {command.flags ? <p className="CommandText">Flags: </p> : ''}
                                            {command.flags ? command.flags.map((flag, idxxx) => <MDBBadge key={idxxx} color="dark" style={{ display: "inline" }}>{`${flag} `}</MDBBadge>) : ''}
                                            <br />
                                            <br />
                                            <p className="CommandText">Example: </p>
                                            <p style={{ fontStyle: "italic", display: "inline" }}>?{command.example}</p>
                                        </MDBCardText>
                                        {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                                        </MDBCardBody>
                                    </MDBCard>
                                </Col>
                                </Row>
                            );
                        })
                    }
                </Col>
                </Row>
            );
        })

        return(
            <Container fluid>
            {Commands.length > 0 ? Commands : <h4 className="h4" style={{ marginBottom: "5%" }}>No Commands Found</h4>}
            </Container>
        );
    }

    renderCommandInfo() {
        let commands = this.props.commands.filter(el => { return el.name.indexOf(this.state.search) !== -1; });
        return <CommandInfo commands={commands} />;
    }

    render() {
        return(
            <div className="Command">
            <Container fluid>
            <Row style={{ marginBottom: "5%" }}>
                <Col md={2} style={{ position: "fixed" }}>
                    <CommandsSideNav commands={this.props.commands} />
                </Col>
                <Col>
                    <Container>
                    <Row style={{ marginBottom: "2%" }}>
                        <Col lg={10} md={2} sm={2}>
                        <MDBFormInline className="md-form" >
                            <FontAwesomeIcon icon="search" />
                            <input 
                            className="form-control ml-3" 
                            style={{ background: "transparent", color: "#cccccc" }} 
                            type="text"
                            name="search"
                            placeholder="Search" 
                            aria-label="Search"
                            onChange={this.handleChange}
                            />
                        </MDBFormInline>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "5%" }}>
                        <Col>
                        {this.renderCommandInfo()}
                        </Col>
                    </Row>
                        {this.renderCommands()}
                    </Container>
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
};

export default Command;