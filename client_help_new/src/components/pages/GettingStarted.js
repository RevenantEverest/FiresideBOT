import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import Skin from '../../res/Skin';

class GettingStarted extends Component {

    _inviteLink = `https://discordapp.com/oauth2/authorize?client_id=441338104545017878&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=bot`

    render() {
        return(
            <div id="GettingStarted" style={{ marginTop: "2%", marginBottom: "5%" }}>
                <Helmet>
                    <title>FiresideBOT | Getting Started</title>
                    <meta name="theme-color" content="#ff9900" />
                    <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="FiresideBOT | Getting Started" />
                    <meta property="og:description" content="Learn what it takes to get up and running with Fireside" />
                    <meta property="og:url" content="https://firesidebot.com" />
                    <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
                </Helmet>
                <Container>
                <Row style={{ marginBottom: "6%" }}>
                    <Col>
                    <h1 className="h1 font-bold">Getting Started</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <h4 className="h3">Bringing Fireside Into Your Server</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "10%" }}>
                    <Col>
                        <p>Start by clicking the button below and choosing which server you'd like to add Fireside to.</p>
                        <br />
                        <MDBBtn color={Skin.MDBColor} className="mb-5 DiscordButton" size="md">
                            <a target="_blank" rel="noopener noreferrer" href={this._inviteLink}>
                            Add To Discord
                            </a>
                        </MDBBtn>
                        <br />
                        <p className="display-inline">
                            Once Fireside joins, it will post a thank you message explaining useful starting commands your server's default prefix.
                            If this is your first time using Fireside the prefix will be 
                        </p>
                        <p style={{ fontWeight: "800" }} className="display-inline"> ?</p>
                        <p className="display-inline">
                            . If you have used Fireside before and changed it's prefix, then the default
                            will be the prefix set previosuly. You can always double check your prefix by using either the
                        </p>
                        <Link to={`/commands/config`}>
                        <p className="orange-text display-inline"> config </p>
                        </Link>
                        <p className="display-inline">
                            command or by using </p>
                        <p style={{ fontWeight: "600" }} className="display-inline">Fireside Prefix </p>
                        <p className="display-inline">
                            which is a command that requires no prefix and will display the currently set prefix.
                        </p>
                        <p className="display-inline"> If you choose you want to re define what Fireside's prefix is you can use the command</p>
                        <Link to={`/commands/editprefix`}>
                        <p className="orange-text display-inline"> EditPrefix</p>
                        </Link>
                        <p className="display-inline">.</p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <h4 className="h3">Configuring Fireside</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "4%" }}>
                    <Col>
                        <p>
                            Fireside has a lot of modules that can be configured now or later on. Here we'll talk about what they are, 
                            what their default options are, and how you can configure them.
                        </p>
                        <br />
                        <br />
                        <p className="display-inline"> 
                            The first configurable module is Fireside's Server Currency (Economy). The editable fields are Currency Name and Currency Increase Rate. 
                            Currency Name is the name of the currency for your server. It's default value is Kindling and can be edited with the command 
                        </p>
                        <Link to={`/commands/editcurrencyname`}>
                        <p className="orange-text display-inline"> EditCurrencyName</p>
                        </Link>
                        <p className="display-inline">
                            . Currency Increase Rate is the rate at which server members gather currency. Currency is gathered on a per message basis
                            so the currency increase rate is set to 10, then a server member will gain 10 points of currency per message. The default value for this
                            is 10 and can be edited with the command 
                        </p>
                        <Link to={`/commands/editcurrencyrate`}>
                        <p className="orange-text display-inline"> EditCurrencyRate</p>
                        </Link>
                        <p className="display-inline">.</p>
                        <br />
                        <br />
                        <h5 className="h5">Currency Module</h5>
                        <br/>
                        <MDBTable responsive style={{ color: "#cccccc" }}>
                            <MDBTableHead>
                                <tr>
                                    <th>Configurable Field</th>
                                    <th>Default Value</th>
                                    <th>Edit Command</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>Currency Name</td>
                                    <td>Kindling</td>
                                    <td><Link to="/command/editcurrencyname" className="orange-text">EditCurrencyName</Link></td>
                                </tr>
                                <tr>
                                    <td>Currency Increase Rate</td>
                                    <td>10</td>
                                    <td><Link to="/command/editcurrencyrate" className="orange-text">EditCurrencyRate</Link></td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                        <br />
                        <br />
                        <p className="display-inline"> 
                            The second configurable module is Fireside's Server Rank System. The editable fields are Rank Complexity, General Increase Rate
                            and Level Up Channel. Rank Complexity defines how hard it is to rank up. This field can be adjusted between 1 and 10, with 1 being the easiest to
                            rank up and 10 being the hardest. It's default value is 2 and can be edited with the command 
                        </p>
                        <Link to={`/commands/editrankcomplexity`}>
                        <p className="orange-text display-inline"> EditRankComplexity</p>
                        </Link>
                        <p className="display-inline">
                            . General Increase Rate defines how much exp a user gets per message. 
                            Just like the Currency Modules's Currency Increase Rate the general increase rate is by default set to 10, 
                            and a server member will gain 10 points of experience per message. This field can be edited with the command
                        </p>
                        <Link to={`/commands/editrankrate`}>
                        <p className="orange-text display-inline"> EditRankRate</p>
                        </Link>
                        <p className="display-inline">
                            . There are also commands to create, edit and delete Ranks. You can go to the command section of these docs to see how they work or
                            click the buttons below to be redirected to them.
                        </p>
                        <br />
                        <Container style={{ marginTop: "4%" }}>
                        <Row>
                            <Col lg={2} md={2}>
                                <Link to="/commands/addrank">
                                <MDBBtn color={Skin.MDBColor} className="Button w-100" size="md">AddRank</MDBBtn>
                                </Link>
                            </Col>
                            <Col lg={2} md={4}>
                                <Link to="/commands/editrank">
                                <MDBBtn color={Skin.MDBColor} className="Button w-100" size="md">EditRank</MDBBtn>
                                </Link>
                            </Col>
                            <Col lg={2} md={4}>
                                <Link to="/commands/removerank">
                                <MDBBtn color={Skin.MDBColor} className="Button w-100" size="md">RemoveRank</MDBBtn>
                                </Link>
                            </Col>
                        </Row>
                        </Container>
                        <br />
                        <br />
                        <h5 className="h5">Ranks Module</h5>
                        <br/>
                        <MDBTable responsive style={{ color: "#cccccc" }}>
                            <MDBTableHead>
                                <tr>
                                    <th>Configurable Field</th>
                                    <th>Default Value</th>
                                    <th>Edit Command</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>Complexity</td>
                                    <td>20</td>
                                    <td><Link to="/command/config/editrankcomplexity" className="orange-text">EditRankComplexity</Link></td>
                                </tr>
                                <tr>
                                    <td>General Increase Rate</td>
                                    <td>10</td>
                                    <td><Link to="/command/config/editrankrate" className="orange-text">EditRankRate</Link></td>
                                </tr>
                                <tr>
                                    <td>Level Up Channel</td>
                                    <td>None</td>
                                    <td><Link to="/command/config/editrankchannel" className="orange-text">EditRankChannel</Link></td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default GettingStarted;