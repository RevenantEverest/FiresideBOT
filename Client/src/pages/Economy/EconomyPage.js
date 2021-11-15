import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { Breadcrumb } from '../../components/Common';

function EconomyPage({ userData }) {
    
    return(
        <div className="dashboard-page">
            <Container fluid>
            <Breadcrumb routes={[ { title: "Economy", path: "/economy" } ]} />
            <Row>
                <Col>
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default EconomyPage;