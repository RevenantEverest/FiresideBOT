import React, { useState } from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBCol as Col,
    MDBTestimonial,
    MDBAvatar,
    MDBIcon
} from 'mdbreact';
import { FirBtn } from '../Common';
import { text, numbers } from '../../utils';
import TestimonialModal from './TestimonialModal';

function TestimonialCard({ testimonial }) {

    const styles = useStyles();

    const [visible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(!visible);
    };

    const renderStars = () => {
        let stars = [];
        for(let i = 0; i < testimonial.stars; i++) {
            if((i + 1) > testimonial.stars && numbers.isFloat(testimonial.stars))
                stars.push(<MDBIcon icon="star-half" className={"mx-1 " + styles.icon} />);
            else 
                stars.push(<MDBIcon icon="star" className={"mx-1 " + styles.icon} />);
        }

        return stars;
    };

    return(
        <Col md="4">
        <MDBTestimonial>
            <MDBAvatar className="mx-auto">
                <img className="rounded-circle img-fluid" src={testimonial.image} alt={testimonial.user} />
            </MDBAvatar>
            <h4 className={"font-weight-bold mt-4 " + styles.user}>
                {testimonial.user}
            </h4>
            <h6 className={"font-weight-bold my-3 " + styles.title}>
                {testimonial.title}
            </h6>
            <div className="mb-3">
                {renderStars()}
            </div>
            <p className={"font-weight-normal " + styles.review}>
                <MDBIcon icon="quote-left" className="pr-2" />
                {text.truncateText(testimonial.review, 160)}
            </p>
            <FirBtn size="sm" onClick={toggle}>
                View Full
            </FirBtn>

            <TestimonialModal
            visible={visible}
            toggle={toggle}
            testimonial={testimonial}
            />
        </MDBTestimonial>
        </Col>
    );
};

const useStyles = makeStyles((theme) => ({
    user: {
        color: theme.colors.text
    },
    title: {
        color: theme.colors.primary
    },
    icon: {
        color: theme.colors.secondary
    },
    review: {
        color: theme.colors.mutedText
    }
}));

export default TestimonialCard;