import React from 'react';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { Breadcrumb } from '../../components/Common';

function PlaylistsPage({ userData }) {
    
    return(
        <div className="dashboard-page">
            <Container fluid>
            <Breadcrumb routes={[ { title: "Playlists", path: "/playlists" } ]} />
            <Row>
                <Col>
                </Col>
            </Row>
            </Container>
        </div>
    );
};

export default PlaylistsPage;