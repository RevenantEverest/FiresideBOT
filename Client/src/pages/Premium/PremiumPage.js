import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBAnimation
} from 'mdbreact';
import { PremiumPricing, PremiumTable } from '../../components/Premium';

function PremiumPage({ userData }) {
    
    return(
        <div className="app-page mb-5">
            <Container>
            <Row>
                <PremiumPricing />
            </Row>
            <MDBAnimation reveal type="fadeInLeft" duration="1.3s">
                <Row>
                    <PremiumTable />
                </Row>
            </MDBAnimation>
            </Container>
        </div>
    );
};

export default PremiumPage;