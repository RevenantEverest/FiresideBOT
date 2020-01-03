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
                        Why is it so great?
                        </h2>
                        <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam.
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
                            src="https://i.imgur.com/svUMCo8.png"
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
                    <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam.
                    </p>
                    <MDBRow>
                    <MDBCol lg="6" className="text-center text-lg-left" style={{ marginBottom: "5%" }}>
                        <img
                        className="img-fluid"
                        src="https://i.imgur.com/PojE25G.png"
                        alt=""
                        style={{ borderRadius: "6px" }}
                        />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="share" size="lg" className="indigo-text" />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Safety</h5>
                            <p className="grey-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            enim ad minima veniam, quis nostrum exercitationem ullam.
                            Reprehenderit maiores aperiam assumenda deleniti hic.
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
                            <MDBIcon icon="share" size="lg" className="indigo-text" />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Safety</h5>
                            <p className="grey-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            enim ad minima veniam, quis nostrum exercitationem ullam.
                            Reprehenderit maiores aperiam assumenda deleniti hic.
                            </p>
                        </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol lg="6" className="text-center text-lg-left">
                        <img
                        className="img-fluid"
                        src="https://i.imgur.com/WI0JiXM.png"
                        alt=""
                        style={{ borderRadius: "6px" }}
                        />
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