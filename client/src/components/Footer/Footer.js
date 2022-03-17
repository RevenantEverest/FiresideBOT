import React, { Component } from 'react';
import './Footer.css';

import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBFooter } from 'mdbreact';

class Footer extends Component {

    render() {
        let filterArr = ["/", "/features", "/premium", "/faq", "/changelogs"];
        let pathCheck = this.props.location.pathname.split("/").includes("changelogs") || filterArr.includes(this.props.location.pathname);
        return(
            <div id="Footer" className={pathCheck ? '' : 'display-none'}>
                <MDBFooter style={{ background: "#060606" }} className="font-small pt-4 mt-4">
                <Container fluid className="text-center text-md-left" style={{ marginBottom: "2%" }}>
                    <Row>
                    <Col md="6" className="Footer-Col__Sec1">
                        <img src="https://i.imgur.com/KR9xQdZ.png" alt="" className="Footer-Logo" />
                        <h5 className="title Footer-Logo-Text">FiresideBOT</h5>
                        <Row style={{ marginTop: "2%" }}>
                        <Col className="Footer-Col" style={{ marginBottom: "2%" }}>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TqKHVUa">
                                <FontAwesomeIcon className="Footer-Icon" icon={['fab', 'discord']} />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/RevenantEeverest/">
                            <FontAwesomeIcon className="Footer-Icon" icon={['fab', 'facebook']} />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/RevenantEverest">
                            <FontAwesomeIcon className="Footer-Icon" icon={['fab', 'twitter']} />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/RevenantEverest/FiresideBOT">
                            <FontAwesomeIcon className="Footer-Icon" icon={['fab', 'github']} />
                            </a>
                        </Col>
                        </Row>
                        <Row>
                            <Col className="Footer-Col">
                                <p>Enjoying</p><p className="Footer-Fireside"> FiresideBOT</p><p>? Give us a vote over at </p>
                                <a id="Footer-DBL-Link" target="_blank" rel="noopener noreferrer" href="https://discordbots.org/bot/441338104545017878"> DBL</a> 
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/status/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                            </Col>
                            <Col lg={2}>
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/servers/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                            </Col>
                            <Col lg={2}>
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/upvotes/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="2" style={{ marginBottom: "2%" }}>
                        <h5 className="title Footer-UL-Title__Contact">Contact</h5>
                        <ul className="Footer-UL" style={{ paddingLeft: "0" }}>
                        <li className="list-unstyled Footer-LI">
                            <p>firesidebot@gmail.com</p>
                        </li>
                        </ul>
                    </Col>
                    <Col md="2" style={{ marginBottom: "2%" }}>
                        <h5 className="title Footer-UL-Title__UsefulLinks">Useful Links</h5>
                        <ul className="Footer-UL" style={{ paddingLeft: "0" }}>
                        <li className="list-unstyled Footer-LI">
                            <Link to="/faq" className="Footer-Link">Frequently Asked Questions</Link>
                        </li>
                        <li className="list-unstyled Footer-LI">
                            <Link to="/premium" className="Footer-Link">Premium</Link>
                        </li>
                        <li className="list-unstyled Footer-LI">
                            <Link to="/changelogs" className="Footer-Link">Changelogs</Link>
                        </li>
                        </ul>
                    </Col>
                    <Col md="2" style={{ marginBottom: "2%" }}>
                        <h5 className="title Footer-UL-Title__UsefulLinks">Resources</h5>
                        <ul className="Footer-UL" style={{ paddingLeft: "0" }}>
                        <li className="list-unstyled Footer-LI">
                            <a className="Footer-Link" target="_blank" rel="noopener noreferrer" href="https://help.firesidebot.com">Support</a>
                        </li>
                        <li className="list-unstyled Footer-LI">
                            <a className="Footer-Link" target="_blank" rel="noopener noreferrer" href="https://help.firesidebot.com">Documentation</a>
                        </li>
                        </ul>
                    </Col>
                    </Row>
                </Container>
                <div className="footer-copyright text-center py-3" style={{ background: "#0a0a0a" }}>
                    <Container fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://firesidebot.com"> FiresideBOT.com </a>
                    </Container>
                </div>
                </MDBFooter>
            </div>
        );
    }
};

export default withRouter(Footer);