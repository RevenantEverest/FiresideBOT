import React, { Component } from 'react';
import './Changelogs.css';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBBtn,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBFormInline,
    MDBBadge
} from 'mdbreact';

import Skin from '../../res/Skin';

class Changelogs extends Component {

    constructor() {
        super();
        this.state = {
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    renderChangeLogs() {
        if(this.props.changelogs.length < 1) return <h5 className="h5">No ChangeLogs</h5>
        let ChangeLogs = this.props.changelogs.filter(el => { return el.version.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            idx++;
            return(
                <Col key={idx} lg={12}>
                <MDBBtn color="elegant" style={{ marginBottom: "1rem", width: "200px" }} onClick={this.toggleCollapse(`basicCollapse${idx + 1}`)}>
                {el.version} {el.type} 
                <FontAwesomeIcon className="FontAwesomeIcon" style={{ marginLeft: "4%" }} icon="angle-right" />
                </MDBBtn>
                <MDBCollapse id={`basicCollapse${idx + 1}`} isOpen={this.state.collapseID}>
                    <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardBody>
                        <MDBCardText tag="div">
                            <Row style={{ marginBottom: "2%" }}>
                            <Col>
                                <Link to={`/changelogs/v${el.version}`}>
                                <MDBBtn color={Skin.hex} className="Button" size="sm" style={{ background: Skin.hex, color: "#cccccc" }}>View Changelog</MDBBtn>
                                </Link>
                            </Col>
                            </Row>
                            <Row style={{ marginBottom: "2%" }}>
                            <Col>
                                <h6 className="h6 display-inline" style={{ color: "#cccccc", fontWeight: 600 }}>Release Date: </h6>
                                <MDBBadge color="dark" className="display-inline">{el.release_date}</MDBBadge>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                                <ReactMarkdown source={el.content} />
                            </Col>
                            </Row>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCollapse>
                </Col>
            );
        });

        return ChangeLogs;
    }

    render() {
        
        return(
            <div id="ChangeLogs" style={{ marginTop: "2%", marginBottom: "5%" }}>
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
            <Row>
                {this.props.changelogs ? this.renderChangeLogs() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
            </Row>
            </Container>
            </div>
        );
    }
};

export default Changelogs;