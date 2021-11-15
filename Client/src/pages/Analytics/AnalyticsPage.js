import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { Breadcrumb } from '../../components/Common';

function AnalyticsPage({ userData }) {

    console.log("Analytics");
    
    return(
        <div className="dashboard-page">
            <Container fluid>
            <Breadcrumb routes={[ { title: "Analytics", path: "/analytics" } ]} />
            </Container>
        </div>
    );
};

export default AnalyticsPage;