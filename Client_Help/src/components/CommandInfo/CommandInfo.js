import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBCard } from 'mdbreact';

class CommandInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let categories = this.props.commands.map(el => el.category);
        categories = categories.filter((el, idx) => categories.indexOf(el) === idx)
        return(
            <div id="CommandInfo">
                <Container>
                <Row>
                    <Col md={6} className="WeeklyWrapUp-Col">
                        <MDBCard style={{ background: "#1a1a1a", color: "inherit", paddingBottom: "5%" }} className="cascading-admin-card">
                        <div className="admin-up">
                        <FontAwesomeIcon icon="magic" className="FontAwesomeIcon orange" />
                            <div className="data">
                            <p>COMMANDS</p>
                            <h4>
                                <strong>{this.props.commands.length}</strong>
                            </h4>
                            </div>
                        </div>
                        </MDBCard>
                    </Col>
                    <Col md={6} className="WeeklyWrapUp-Col">
                        <MDBCard style={{ background: "#1a1a1a", color: "inherit", paddingBottom: "5%" }} className="cascading-admin-card">
                        <div className="admin-up">
                        <FontAwesomeIcon icon="folder-open" className="FontAwesomeIcon cyan" />
                            <div className="data">
                            <p>CATEGORIES</p>
                            <h4>
                                <strong>{categories.length}</strong>
                            </h4>
                            </div>
                        </div>
                        </MDBCard>
                    </Col>
                    {/* <Col md={4} className="WeeklyWrapUp-Col">
                        <MDBCard style={{ background: "#1a1a1a", color: "inherit", paddingBottom: "5%" }} className="cascading-admin-card">
                        <div className="admin-up">
                        <FontAwesomeIcon icon="magic" className="FontAwesomeIcon yellow" />
                            <div className="data">
                            <p>CATEGORIES</p>
                            <h4>
                                <strong>{categories.length}</strong>
                            </h4>
                            </div>
                        </div>
                        </MDBCard>
                    </Col> */}
                </Row>
                </Container>
            </div>
        );
    }
};

export default CommandInfo;