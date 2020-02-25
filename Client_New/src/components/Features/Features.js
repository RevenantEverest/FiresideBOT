import React, { Component } from 'react';
import './Features.css';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdbreact';
import Skin from '../../res/Skin';

class Features extends Component {

    render() {
        return(
            <div id="Features">
                <MDBContainer>
                <MDBRow>
                    <section className="my-5">
                        <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Why choose Fireside?
                        </h2>
                        <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                        Fireside is a bot that lets you listen to music you love while also adding great features, moderation tools, 
                        and overall improvements to your Discord server. From a casual server, to a community, Fireside bot is a great investment.
                        </p>

                        <MDBRow>
                        <MDBCol md="4">
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="music" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Music</h5>
                                <p className="white-text">
                                Queue up some tunes, and save them to a playlist with our extensive Music funtionality.
                                </p>
                            </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="bolt" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Moderation</h5>
                                <p className="white-text">
                                Take control of your server with powerful admin and moderation tools.
                                </p>
                            </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="coins" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Economy</h5>
                                <p className="white-text">
                                Reward active members of your server with a server wide currency system.
                                </p>
                            </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md="4" className="text-name">
                            <img
                            className="img-fluid"
                            src="https://i.imgur.com/ug9huUj.png"
                            alt=""
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="cogs" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Customized Settings</h5>
                                <p className="white-text">
                                Some default setting not to your liking? 
                                Change it up with fully customizeable options.
                                </p>
                            </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="user-astronaut" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Active Developer</h5>
                                <p className="white-text">
                                Major updates released at least once a month, and always feature packed.
                                </p>
                            </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                            <MDBCol size="2">
                                <MDBIcon icon="code" size="2x" style={{ color: Skin.hex }} />
                            </MDBCol>
                            <MDBCol size="10">
                                <h5 className="font-weight-bold mb-3">Open Source</h5>
                                <p className="white-text">
                                Fireside has been and always will be open source. Feel free to 
                                contribute or check out the project by clicking the github link below.
                                </p>
                            </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        </MDBRow>
                    </section>
                </MDBRow>
                <MDBRow>
                <section className="my-5">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                    What do we offer?
                    </h2>
                    <MDBRow>
                    <MDBCol lg="6" className="text-center text-lg-left" style={{ marginBottom: "5%" }}>
                        <img
                        className="img-fluid"
                        src="https://i.imgur.com/M8TqvKT.png"
                        alt=""
                        style={{ borderRadius: "6px" }}
                        />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="grin-alt" size="lg" style={{ color: Skin.hex }} />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Cuztomizeable Welcome Message</h5>
                            <p className="grey-text">
                            Take advantage of our customizeable Welcome Messages that are sent to all new server members.
                            Let them know what your server's about and where they can find important information!
                            </p>
                        </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                </section>
                </MDBRow>
                <MDBRow>
                <section className="my-5">
                    <MDBRow>
                    <MDBCol lg="6">
                        <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon fab icon="twitch" size="lg" style={{ color: Skin.hex }} />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Twitch Auto Notification</h5>
                            <p className="grey-text">
                            Get notified every time your favorite streamer goes live! Customize the channel 
                            and the role that gets tagged each time a notification is posted.
                            </p>
                        </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol lg="6" className="text-center text-lg-left">
                        <img
                        className="img-fluid"
                        src="https://i.imgur.com/vMkomOy.png"
                        alt=""
                        style={{ borderRadius: "6px" }}
                        />
                    </MDBCol>
                    </MDBRow>
                </section>
                </MDBRow>
                <MDBRow>
                <section className="my-5">
                    <MDBRow>
                    <MDBCol lg="6" className="text-center text-lg-left" style={{ marginBottom: "5%" }}>
                        <img
                        className="img-fluid"
                        src="https://i.imgur.com/cyYObmq.png"
                        alt=""
                        style={{ borderRadius: "6px" }}
                        />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="ghost" size="lg" style={{ color: Skin.hex }} />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Vibe Checks</h5>
                            <p className="grey-text">
                            Compete with your friends to see who's vibing and who's not for the day.
                            </p>
                        </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                </section>
                </MDBRow>
                </MDBContainer>
            </div>
        );
    }
};

export default Features;