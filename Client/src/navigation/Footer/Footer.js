import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBFooter
} from 'mdbreact';

import ThemeChanger from '../../components/ThemeChanger/ThemeChanger';

import Logo from '../../assets/images/logo_trans.png';

function Footer({ changeTheme }) {

    const theme = useTheme();
    const styles = useStyles();

    return(
        <MDBFooter className={"page-footer font-small pt-0 w-100 " + styles.footer}>
        <div style={{ backgroundColor: theme.colors.secondary }}>
            <Container fluid className="text-center text-md-left">
            <Row className="py-4 d-flex align-items-center">
                <Col md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0 white-text">
                    Get connected with us on social networks!
                </h6>
                </Col>
                <Col md="6" lg="7" className="text-center text-md-right">
                <a className="tw-ic" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                    <i className="fab fa-discord white-text mr-4" />
                </a>
                <a className="fb-ic ml-0" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/FiresideBOT">
                    <i className="fab fa-facebook-f white-text mr-4" />
                </a>
                <a className="tw-ic" target="_blank" rel="noopener noreferrer" href="https://twitter.com/FiresideBOT">
                    <i className="fab fa-twitter white-text mr-4" />
                </a>
                <a className="tw-ic" target="_blank" rel="noopener noreferrer" href="https://github.com/RevenantEverest/FiresideBOT">
                    <i className="fab fa-github white-text mr-4" />
                </a>
                </Col>
            </Row>
            </Container>
        </div>
        <Container className="mt-5 mb-4 text-center text-md-left">
            <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mb-4">
                <div className="d-flex">
                    <img className={"img-fluid mb-2 " + styles.logo} src={Logo} alt="logo" />
                    <h6 className="text-uppercase font-weight-bold">
                        <strong>FiresideBOT</strong>
                    </h6>
                </div>
                <hr className={"accent-2 mb-3 mt-0 d-inline-block mx-auto " + styles.hr} />
                <div className="d-flex flex-row">
                    <a className="mb-2 mr-2" href="https://discordbots.org/bot/441338104545017878" >
                        <img src="https://discordbots.org/api/widget/status/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                    </a>
                    <a className="mb-2 mr-2" href="https://discordbots.org/bot/441338104545017878" >
                        <img src="https://discordbots.org/api/widget/servers/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                    </a>
                </div>
                <p>
                    Here you can use rows and columns here to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                </p>
            </Col>
            <Col md="2" lg="2" xl="2" className="mb-4">
                <h6 className="text-uppercase font-weight-bold">
                <strong>Resources</strong>
                </h6>
                <hr className={"accent-2 mb-4 mt-0 d-inline-block mx-auto " + styles.hr} />
                <a className="d-flex flex-column" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                    Support Server
                </a>
                <a className="d-flex flex-column" target="_blank" rel="noopener noreferrer" href="https://help.firesidebot.com">
                    Help Documentation
                </a>
            </Col>
            <Col md="3" lg="2" xl="2" className="mb-4">
                <h6 className="text-uppercase font-weight-bold">
                    <strong>Useful links</strong>
                </h6>
                <hr className={"accent-2 mb-4 mt-0 d-inline-block mx-auto " + styles.hr} />
                <Link to="/premium">
                    <p className="mb-2">Premium</p>
                </Link>
                <Link to="/faq">
                    <p className="mb-2">FAQ</p>
                </Link>
                <Link to="/changelogs">
                    <p className="mb-2">Changelogs</p>
                </Link>
            </Col>
            <Col md="3" lg="3" xl="3" className="mb-4">
                <h6 className="text-uppercase font-weight-bold">
                    <strong>Contact</strong>
                </h6>
                <hr className={"accent-2 mb-4 mt-0 d-inline-block mx-auto " + styles.hr} />
                <p>
                    <i className="fa fa-envelope mr-1" /> FiresideBOT@gmail.com
                </p>
            </Col>
            <Col>
                <h6 className="text-uppercase font-weight-bold">
                    <strong>Change Theme</strong>
                </h6>
                <hr className={"accent-2 mb-4 mt-0 d-inline-block mx-auto " + styles.hr} />
                <div className="d-flex justify-content-center h-100">
                    <ThemeChanger changeTheme={changeTheme} />
                </div>
            </Col>
            </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
            <Container fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://firesidebot.com"> FiresideBOT.com </a>
            </Container>
        </div>
        </MDBFooter>
    );
};

const useStyles = makeStyles((theme) => ({
    footer: {
        background: theme.colors.dark
    },
    logo: {
        marginTop: -12,
        width: 40
    },
    hr: {
        width: 60,
        height: 2,
        background: theme.colors.secondary
    },
    footerLink: {
        ':hover': {
            color: theme.colors.secondary
        }
    }
}));

export default Footer;