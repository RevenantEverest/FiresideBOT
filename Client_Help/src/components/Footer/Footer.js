import React, { Component } from 'react';
import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

class Footer extends Component {

    render() {
        return(
            <div>
                <Container fluid id="Footer">
                    <Row className="justify-content-md-center">
                        <Col className="Footer-Col">
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
                        <Col className="Footer-Col">
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/status/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/servers/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                            <a className="Footer-DBL" href="https://discordbots.org/bot/441338104545017878" >
                            <img src="https://discordbots.org/api/widget/upvotes/441338104545017878.svg?noavatar=true" alt="FiresideBOT" />
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>©2019 FiresideBOT</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Footer;