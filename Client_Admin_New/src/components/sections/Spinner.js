import React, { Component } from 'react';

import { Row, Col, Spinner as ReactSpinner } from 'react-bootstrap';

class Spinner extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderLoadingSpinner() {
        return(
            <Row>
                <Col>
                <ReactSpinner animation="border" role="status"><span className="sr-only">Loading...</span></ReactSpinner>
                </Col>
            </Row>
        );
    }

    renderSelectCampaignSpinner() {
        return(
            <Row>
                <Col>
                    <ReactSpinner animation="border" role="status" className="display-inline-block"><span className="sr-only">Loading...</span></ReactSpinner>
                    <h5 className="h5 ml-4 display-inline">Please Select A Server Before Continuing</h5>
                </Col>
            </Row>
        );
    }

    render() {
        let { dataReceived, manageGuild, requiresGuild } = this.props;
        return(
            <div className={`Spinner ${this.props.className}`}>
            {!dataReceived && manageGuild ? this.renderLoadingSpinner() : ""}
            {!dataReceived && !manageGuild ? this.renderLoadingSpinner() : "" }
            {!this.props.manageGuild && requiresGuild ? this.renderSelectCampaignSpinner() : ""}
            </div>
        );
    }
};

export default Spinner;