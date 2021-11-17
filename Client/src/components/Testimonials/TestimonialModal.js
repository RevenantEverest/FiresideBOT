import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBAvatar,
    MDBIcon
} from 'mdbreact';
import { numbers } from '../../utils';

function TestimonialModal({ visible, toggle, testimonial }) {

    const styles = useStyles();

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
        <MDBModal isOpen={visible} toggle={toggle} centered className={styles.modal}>
        <MDBModalHeader toggle={toggle} className={styles.modalHeader} />
        <MDBModalBody className={styles.modalBody}>
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
                {testimonial.review}
            </p>
        </MDBModalBody>
        </MDBModal>
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
        color: theme.colors.text
    },
    modal: {
        '>div': {
            borderRadius: `10px !important`
        }
    },
    modalHeader: {
        backgroundColor: `${theme.colors.card} !important`,
        borderBottomColor: `${theme.colors.card} !important`,
        borderRadius: `8px 8px 0 0 !important`,
        '>button>span': {
            color: theme.colors.text
        }
    },
    modalBody: {
        backgroundColor: `${theme.colors.card} !important`,
        borderRadius: `0 0 8px 8px`
    }
}));

export default TestimonialModal;