import React, { Component } from 'react';
import './Testimonials.css';

import {
    MDBContainer,
    MDBRow,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem
} from 'mdbreact';

import SingleTestimonial from './SingleTestimonial/SingleTestimonial';

class Testimonials extends Component {

    render() {
        return(
            <div id="Testimonials">
            <MDBContainer fluid>
                <section className="text-center my-5">
                    <h2 className="h1-responsive font-weight-bold my-5">
                    Testimonials
                    </h2>
                    <MDBCarousel
                    activeItem={1}
                    length={3}
                    slide={true}
                    showControls={true}
                    multiItem
                    testimonial
                    >
                    <MDBCarouselInner>
                        <MDBRow>

                        {/* Carousel 1 */}
                        <MDBCarouselItem itemId="1">
                            <SingleTestimonial 
                            image={"https://i.imgur.com/MUgJw51.png"} 
                            name={"Cardboard Marty"} 
                            title={"Premium User"} 
                            review={`
                                Fireside is my favorite Discord bot by far! I love 
                                its expansive feature list and interacting with the 
                                developer has been a real pleasure. Support issues are 
                                always addressed quickly and proactively, and I know I 
                                can always rely on Fireside to entertain my server!
                            `} 
                            stars={[1, 1, 1, 1, 1]}
                            mobileDisplay
                            />
                            <SingleTestimonial 
                            image={"https://i.imgur.com/dbSEZEs.png"} 
                            name={"DJrectangle"} 
                            title={"User"} 
                            review={`
                                Great music bot, Awesome icon, You'll love it!
                                Always use it in my server as our music bot.
                                Free to use, but great premium features!
                            `} 
                            stars={[1, 1, 1, 1, .5]} 
                            />
                            <SingleTestimonial 
                            image={"https://i.imgur.com/C6ND44T.png"} 
                            name={"Spark1yTurtle"} 
                            title={"Premium User"} 
                            review={`
                            Fireside is an excellent application in Discord. Anytime I want to play music, 
                            it doesn't interrupt my streaming, gaming, or calls in all my servers. This application 
                            is easy to install, easy to program and premium allows me to go above and beyond for music 
                            distribution in discord.
                            `} 
                            stars={[1, 1, 1, 1, 0]}
                            />
                        </MDBCarouselItem>

                        {/* Carousel 2 */}
                        <MDBCarouselItem itemId="2">
                            <SingleTestimonial 
                            image={"https://i.imgur.com/wgktMou.png"} 
                            name={"nick32701"} 
                            title={"Premium User"} 
                            review={`
                                Fireside is definitely my go to bot for music. Being able to 
                                adjust the volume not only on discord, but through commands 
                                aswell without paying is really great. It is so much better than most bots available.
                            `} 
                            stars={[1, 1, 1, 1, .5]}
                            mobileDisplay
                            />
                            <SingleTestimonial 
                            image={"https://i.imgur.com/rGdkWI2.png"} 
                            name={"Psy"} 
                            title={"User"} 
                            review={`
                                Fireside bot is a great bot i suggest it to all my friends that have discord servers. 
                                It has a lot of utility and features that i use on a daily basis. I love the Rank system 
                                and server playlists that it lets you use. 10/10 bot for sure definitly try it out.
                            `} 
                            stars={[1, 1, 1, 1, 0]} 
                            />
                            <SingleTestimonial 
                            image={"https://i.imgur.com/588QeiT.png"} 
                            name={"Dost"} 
                            title={"Premium User"} 
                            review={`
                                I use this bot for all my discord servers. Works amazing and easy to use. Creator is fast to 
                                responding to tickets and listens to suggestions.
                            `} 
                            stars={[1, 1, 1, 1, 1]} 
                            />
                        </MDBCarouselItem>

                        {/* Carousel 3 */}
                        <MDBCarouselItem itemId="3">
                            <SingleTestimonial 
                            image={"https://i.imgur.com/Yjp8zcD.jpg"} 
                            name={"hidefsilence"} 
                            title={"Premium User"} 
                            review={`
                                Fireside bot is a fantastic bot for any streaming discord. It is well maintained and being updated 
                                regularly and is well on its way to being the only bot needed to help run and maintain my Discord server.
                            `} 
                            stars={[1, 1, 1, 1, 1]}
                            mobileDisplay
                            />
                        </MDBCarouselItem>
                        </MDBRow>
                    </MDBCarouselInner>
                    </MDBCarousel>
                </section>
            </MDBContainer>
            </div>
        );
    }
};

export default Testimonials;