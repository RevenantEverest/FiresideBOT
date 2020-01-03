import React, { Component } from 'react';
import './Testimonials.css';

import {
    MDBContainer,
    MDBRow,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem
} from 'mdbreact';

import SingleTestimonial from '../SingleTestimonial/SingleTestimonial';

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
                    length={2}
                    slide={true}
                    showControls={true}
                    multiItem
                    testimonial
                    >
                    <MDBCarouselInner>
                        <MDBRow>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                                eos id officiis hic tenetur quae quaerat ad velit ab hic
                                tenetur.
                            `} 
                            stars={[1, 1, 1, 1, 0]}
                            />
                        </MDBCarouselItem>
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
                            image={"https://i.imgur.com/z1M2jpa.png"} 
                            name={"CaptainStimpy"} 
                            title={"User"} 
                            review={`
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                                eos id officiis hic tenetur quae quaerat ad velit ab hic
                                tenetur.
                            `} 
                            stars={[1, 1, 1, 1, 0]} 
                            />
                            <SingleTestimonial 
                            image={"https://i.imgur.com/Po0aG3y.png"} 
                            name={"CharlieT"} 
                            title={"User"} 
                            review={`
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                                eos id officiis hic tenetur quae quaerat ad velit ab hic
                                tenetur.
                            `} 
                            stars={[1, 1, 1, 1, 1]} 
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