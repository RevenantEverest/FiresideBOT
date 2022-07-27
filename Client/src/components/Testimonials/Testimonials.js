import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem
} from 'mdbreact';
import TestimonialCard from './TestimonialCard';
import { _Testimonials } from '../../res';
import { colors } from '../../utils';

function Testimonials() {

    const styles = useStyles();

    const amountPerItem = 3;
    const itemAmount = Math.ceil(_Testimonials.length / amountPerItem);

    const renderCarouselItems = () => {
        const TestimonialCards = _Testimonials.map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} key={index.toString()} />    
        ));

        let temp = [];
        for(let i = 0; i < itemAmount; i++) {
            temp.push(
                <MDBCarouselItem itemId={(i + 1).toString()} key={`carouselItem-${i}`}>
                    <div className="d-flex justify-content-center">
                    {TestimonialCards.slice(i * amountPerItem, ((i + 1) * amountPerItem))}
                    </div>
                </MDBCarouselItem>
            );
        }

        return temp;
    };
    
    return(
        <Container fluid>
            <section className="text-center my-5">
                <h2 className={"h1-responsive font-weight-bold text-center mt-5 mb-3 " + styles.title}>
                    Testimonials
                </h2>
                <p className={"lead w-responsive text-center mx-auto mb-5 " + styles.subText}>
                    See what users have to say about Fireside!
                </p>
                <MDBCarousel
                className={styles.carousel}
                activeItem={1}
                length={itemAmount}
                slide={true}
                showControls={true}
                multiItem
                testimonial
                >
                <MDBCarouselInner>
                    <Row>
                        {renderCarouselItems()}
                    </Row>
                </MDBCarouselInner>
                </MDBCarousel>
            </section>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.colors.text
    },
    subText: {
        color: theme.colors.mutedText
    },
    carousel: {
        '>div': {
            '>a': {
                backgroundColor: `${theme.colors.primary} !important`
            }
        },
        '>ol': {
            '>li': {
                backgroundColor: `${colors.hexToRgba(theme.colors.primary, .5)} !important`
            },
            '.active': {
                backgroundColor: `${theme.colors.primary} !important`
            }
        }
    }
}));

export default Testimonials;