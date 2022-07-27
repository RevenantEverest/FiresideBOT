import React, { useState } from 'react';
import Lottie from 'lottie-react-web';
import { Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBBtn
} from 'mdbreact';
import { colors } from '../../utils';

import PageNotFoundMap from '../../assets/lottie/pageNotFoundMap.json';

function PageNotFound() {

    const theme = useTheme();
    const styles = useStyles();

    const [fireRedirect, setFireRedirect] = useState(false);

    return(
        <div>
        <Container className="d-flex" style={{ height: "80vh" }}>
            <Row className="align-self-center">
                <Col>
                    <Lottie options={{ animationData: PageNotFoundMap }} speed={.5} />
                    <div className="d-flex justify-content-center">
                    <MDBBtn 
                    rounded 
                    color="orange" 
                    className={[styles.button, theme.classNames.button].join(" ")} 
                    size="lg"
                    onClick={() => setFireRedirect(true)}
                    >
                        Take me back to safety
                    </MDBBtn>
                    </div>
                </Col>
            </Row>
        </Container>
        {fireRedirect && <Redirect to="/" />}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
        fontWeight: "700 !important",
        ':hover': {
            backgroundColor: `${colors.hexToRgba(theme.colors.primary, .8)} !important`
        }
    }
}));

export default PageNotFound;