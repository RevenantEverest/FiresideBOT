import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { Breadcrumb } from '../../components/Common';

function DashboardPage({ userData }) {
    
    return(
        <div className="dashboard-page">
            <Container fluid>
            <Breadcrumb routes={[ { title: "Dashboard", path: "/dashboard" } ]} />
            <Row>
                <Col>
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default DashboardPage;