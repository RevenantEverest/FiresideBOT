import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { Breadcrumb, CascadingCard } from '../../components/Common';

function DashboardPage({ userData }) {
    
    return(
        <div className="dashboard-page">
            <Container fluid>
            <Breadcrumb routes={[ { title: "Dashboard", path: "/dashboard" } ]} />
            <Row className="my-5">
                <Col md="4" className="mb-4">
                    <CascadingCard 
                    title="New Guild Members" 
                    number={20}
                    iconName="users" 
                    color="#FF5005" 
                    />
                </Col>
                <Col md="4" className="mb-4">
                    <CascadingCard 
                    title="Commands Used" 
                    number={20}
                    iconName="magic" 
                    color="#00B39A" 
                    />
                </Col>
                <Col md="4" className="mb-4">
                    <CascadingCard 
                    title="Songs Played" 
                    number={20}
                    iconName="music" 
                    color="#CC8218" 
                    />
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default DashboardPage;