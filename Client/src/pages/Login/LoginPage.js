import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Lottie from 'lottie-react-web';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col
} from 'mdbreact';
import { DISCORD_LOGIN } from '../../constants';

import Flame from '../../assets/lottie/flame.json';

function LoginPage({ api, userData }) {

    const code = window.location.search.split("code=")[1];
    
    useEffect(() => {
        if(!code) window.location.href = DISCORD_LOGIN;
        if(code) api.login(code);
    }, [code, api]);

    return(
        <div className="app-page">
            <Container className="mt-4">
            <Row className="d-flex justify-content-center">
                <Col md="4">
                    <Lottie options={{ animationData: Flame }} />
                </Col>
            </Row>
            </Container>
            {userData && <Redirect to="/dashboard" />}
        </div>
    );
};

export default LoginPage;