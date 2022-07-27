import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBCard,
    MDBCardBody,
    MDBIcon
} from 'mdbreact';
import { FirBtn, Markdown } from '../../components/Common';

function ChangelogDetailsPage({ userData, changelogs }) {

    const styles = useStyles();

    const location = useLocation();
    const changelogVersion = location.pathname.split("/")[2];
    const changelog = changelogs.items.filter(el => el.version === changelogVersion)[0] ?? null;
    
    return(
        <div className="app-page mt-4 mb-5">
            <Container>
            <Row className="mb-4">
                <Col>
                    <Link to="/changelogs">
                    <FirBtn className={"ml-0 " + styles.button} size="sm">
                        <MDBIcon className="mr-2" icon="chevron-left" />
                        Go Back
                    </FirBtn>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MDBCard className={styles.card}>
                    <MDBCardBody className={styles.cardBody}>
                        <Markdown>
                            {changelog.content}
                        </Markdown>
                    </MDBCardBody>
                    </MDBCard>
                </Col>
            </Row>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${theme.colors.card} !important`
    },
    cardBody: {
        backgroundColor: `${theme.colors.card} !important`
    },
    button: {
        fontWeight: "700 !important"
    }
}));

export default ChangelogDetailsPage;