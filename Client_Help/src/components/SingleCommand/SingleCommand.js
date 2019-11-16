import React, { Component } from 'react';
import './SingleCommand.css';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBBadge } from 'mdbreact';

class SingleCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commandData: this.props.location.state.commandData
        };
    }

    render() {
        const command = this.state.commandData;
        return(
            <div id="SingleCommand" style={{ marginTop: "5%", marginBottom: "5%" }}>
                <Container>
                <Row className="justify-content-md-center">
                    <Col md={7}>
                    <MDBCard style={{ borderLeft: "solid thick orange" }}>
                        <MDBCardBody style={{ background: "#1a1a1a" }}>
                        <MDBCardTitle tag="div">
                            <h2 className="h2" style={{ display: "inline" }}>{command.d_name}</h2> 
                            {command.params ? <h4 className="h4" style={{ display: "inline" }}><MDBBadge color="dark">{(command.params.required ? '<param>' : '[param]')}</MDBBadge></h4> : ''}
                        </MDBCardTitle>
                        <MDBCardText tag="div">
                            <br />
                            <h5 className="CommandText h5">Description: </h5>
                            {<h5 className="h5" style={{ display: "inline" }}>{command.desc}</h5>}
                            {command.aliases.length > 0 ? <br /> : ''}
                            {command.aliases.length > 0 ? <h5 className="CommandText h5">Aliases: </h5> : ''}
                            {command.aliases.length > 0 ? <h5  className="h5" style={{ display: "inline" }}>{command.aliases.map((alias, idxxx) => <MDBBadge key={idxxx} color="dark">{alias}</MDBBadge>)}</h5> : ''}
                            {command.params ? <br /> : ''}
                            {command.params ? <h5 className="CommandText h5">Params: </h5> : ''}
                            {command.params ? <h5 className="h5" style={{ display: "inline" }}>{command.params.params}</h5> : ''}
                            {command.flags ? <br /> : ''}
                            {command.flags ? <h5 className="CommandText h5">Flags: </h5> : ''}
                            {command.flags ? command.flags.map((flag, idxxx) => <MDBBadge key={idxxx} color="dark" style={{ display: "inline" }} className="h5">{`${flag} `}</MDBBadge>) : ''}
                            <br />
                            <br />
                            <h5 className="CommandText h5">Example: </h5>
                            <h5 style={{ fontStyle: "italic", display: "inline" }} className="h5">?{command.example}</h5>
                        </MDBCardText>
                        {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                        </MDBCardBody>
                    </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default SingleCommand;