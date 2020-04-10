import React, { Component } from 'react';
import '../css/CommandPreview.css';

import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBBadge } from 'mdbreact';

class CommandPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            command: this.props.command
        };
    }

    render() {
        const command = this.state.command;
        return(
            <div className="CommandPreview">
            <MDBCard style={{ borderLeft: "solid thick orange" }}>
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                <MDBCardTitle tag="div">
                    <Link to={`/commands/${command.name}`} className="CommandLink">
                        <h4 className="h4 display-inline">{command.d_name}</h4>
                    </Link>
                    {command.params ? <h5 className="h5 display-inline"><MDBBadge color="dark">{(command.params.required ? '<param>' : '[param]')}</MDBBadge></h5> : ''}
                </MDBCardTitle>
                <MDBCardText tag="div">
                    <br />
                    <h6 className="CommandText h6 white-text display-inline">Description: </h6>
                    {<h6 className="h6 display-inline">{command.desc}</h6>}
                    {command.aliases.length > 0 ? <br /> : ''}
                    {command.aliases.length > 0 ? <h6 className="CommandText h6 white-text display-inline">Aliases: </h6> : ''}
                    {command.aliases.length > 0 ? <h6  className="h6 display-inline">{command.aliases.map((alias, idxxx) => <MDBBadge key={idxxx} color="dark" className="mr-2">{alias}</MDBBadge>)}</h6> : ''}
                    {command.params ? <br /> : ''}
                    {command.params ? <h6 className="CommandText h6 white-text display-inline">Params: </h6> : ''}
                    {command.params ? <h6 className="h6 display-inline">{command.params.params}</h6> : ''}
                    {command.flags ? <br /> : ''}
                    {command.flags ? <h6 className="CommandText h6 white-text display-inline">Flags: </h6> : ''}
                    {command.flags ? command.flags.map((flag, idxxx) => <MDBBadge key={idxxx} color="dark" className="h6 display-inline">{`${flag} `}</MDBBadge>) : ''}
                    <br />
                    <br />
                    <h6 className="CommandText h6 white-text display-inline">Example: </h6>
                    <h6 style={{ fontStyle: "italic"}} className="h6 display-inline orange-text">?{command.example}</h6>
                </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </div>
        );
    }
};

export default CommandPreview;