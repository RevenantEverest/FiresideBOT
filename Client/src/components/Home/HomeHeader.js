import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBView,
    MDBMask,
    MDBAnimation,
    MDBBtn,
    MDBIcon
} from 'mdbreact';

import Logo from '../../assets/images/logo_trans.png';
import Embers from '../../assets/images/embers.png';
import Campfire from '../../assets/images/Campfire.jpg';

function HomeHeader() {

    const theme = useTheme();
    const styles = useStyles();

    return(
        <MDBView src={Campfire}>
        <MDBMask overlay="black-strong">
            <MDBView src={Embers}>
            <MDBMask overlay="black-slight" className="flex-center flex-column text-white">
            <Container>
                <Row>
                <Col md="6" sm="12" className="mb-4 d-flex justify-content-center">
                    <MDBAnimation type="slideInLeft" duration="1s">
                    <div>
                        <div className="d-flex flex-row flex-wrap mb-4">
                            <img className={"img-fluid " + styles.logo} src={Logo} alt="logo" />
                            <div>
                                <h1 className="fireside-text h1-reponsive white-text text-uppercase mb-1 pt-md-5 pt-5">
                                    FiresideBOT
                                </h1>
                                <h5 className="h5-responsive muted-text">Build your ideal Discord server in minutes!</h5>
                            </div>
                        </div>
                        <div className="text-center">
                        <MDBAnimation type="fadeIn" duration="1s" delay="1s">
                            <MDBBtn className={[styles.button, styles.userSizeButton].join(" ")} color={theme.colors.mdb.primary} size="md">
                                Serving ... users
                            </MDBBtn>
                            <MDBBtn className={[styles.button, styles.discordButton].join(" ")} color="mdb-color lighten-2" size="md">
                                <MDBIcon className="mr-2" fab icon="discord" />
                                Add To Discord
                            </MDBBtn>
                        </MDBAnimation>
                        </div>
                    </div>
                    </MDBAnimation>
                </Col>
                </Row>
            </Container>
            </MDBMask>
            </MDBView>
        </MDBMask>
        </MDBView>
    );
};

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.colors.text
    },
    logo: {
        width: 160,
        marginTop: -20,
        marginRight: -30
    },
    button: {
        width: "180px"
    },
    discordButton: {
        backgroundColor: `red !important`
    }
}));

export default HomeHeader;