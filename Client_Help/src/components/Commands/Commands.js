import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Commands.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBadge, MDBFormInline, MDBBtn } from 'mdbreact';

import CommandInfo from '../CommandInfo/CommandInfo';
import Skin from '../../res/Skin';

class Command extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions);

    updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight }, () => console.log(this.state.width));

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    renderCommands(commands) {
        let categories = commands.map(el => el.category);
        categories = categories.filter((el, idx) => categories.indexOf(el) === idx);
        let Commands = categories.map((el, idx) => {
            return(
                <Element id={`${el}`} key={idx}>
                <Row style={{ marginBottom: "5%" }} className="justify-content-sm-center">
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
                                    <MDBCard 
                                    style={{ borderLeft: `solid thick ${Skin.hex}` }} 
                                    className={`${this.state.width < 800 ? "w-auto" : "w-50"}`}
                                    >
                                        <MDBCardBody style={{ background: "#1a1a1a" }}>
                                        <MDBCardTitle>
                                        <Link className="CommandLink" to={`/commands/${command.name}`}>
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
                </Element>
            );
        })

        return(
            <Container fluid>
            {Commands.length > 0 ? Commands : <h4 className="h4" style={{ marginBottom: "5%" }}>No Commands Found</h4>}
            </Container>
        );
    }

    renderCommandCategories(commands) {
        let categories = commands.map(el => el.category);
        categories = categories.filter((el, idx) => categories.indexOf(el) === idx);
        let Categories = categories.map((el, idx) => {
            return(
                <Col key={idx} md={2} xs={6}>
                    <ScrollLink activeClass="active" className="test6" to={`${el}`} spy={true} smooth={true} duration={800}>
                        <MDBBtn color={Skin.MDBColor} className="Button w-100" >
                            {el}
                        </MDBBtn>
                    </ScrollLink>
                </Col>
            );
        });
        return Categories;
    }

    render() {
        let commands = this.props.commands.filter(el => { return el.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1; });
        return(
            <div className={`Command ${commands.length < 1 ? "ScreenFill" : ""}`}>
            <Container fluid>
            <Row style={{ marginBottom: "5%" }}>
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
                            <CommandInfo commands={commands} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "5%" }}>
                        {this.renderCommandCategories(commands)}
                    </Row>
                        {this.renderCommands(commands)}
                    </Container>
                </Col>
            </Row>
            </Container>
            </div>
        );
    }
};

export default Command;