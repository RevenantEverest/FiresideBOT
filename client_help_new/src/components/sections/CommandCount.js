import React, { Component } from 'react';
import '../css/CommandCount.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { MDBCard } from 'mdbreact';

class CommandCount extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let categories = this.props.commands.map(el => el.category);
        categories = categories.filter((el, idx) => categories.indexOf(el) === idx)
        return(
            <div id="CommandCount">
                <Row className="CommandCount-Row">
                    <Col md={6} className="CommandCount-Col">
                        <MDBCard style={{ background: "#1a1a1a", color: "inherit", paddingBottom: "5%" }} className="cascading-admin-card">
                        <div className="admin-up">
                        <div className="orange icon-wrapper">
                        <FontAwesomeIcon icon="magic" className="FontAwesomeIcon-admin-card orange" />
                        </div>
                            <div className="data">
                            <p>COMMANDS</p>
                            <h4>
                                <strong>{this.props.commands.length}</strong>
                            </h4>
                            </div>
                        </div>
                        </MDBCard>
                    </Col>
                    <Col md={6} className="CommandCount-Col">
                        <MDBCard style={{ background: "#1a1a1a", color: "inherit", paddingBottom: "5%" }} className="cascading-admin-card">
                        <div className="admin-up">
                            <div className="cyan icon-wrapper">    
                            <FontAwesomeIcon icon="folder-open" className="FontAwesomeIcon-admin-card cyan" />
                            </div>
                            <div className="data">
                            <p>CATEGORIES</p>
                            <h4>
                                <strong>{categories.length}</strong>
                            </h4>
                            </div>
                        </div>
                        </MDBCard>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default CommandCount;