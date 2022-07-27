import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBCard,
    MDBCardBody
} from 'mdbreact';

function WhatWeOfferImageCard({ image, alt }) {

    const styles = useStyles();

    return(
        <MDBCard className={"h-100 " + styles.card}>
        <MDBCardBody className={" " + styles.cardBody}>
            <img 
            className={"img-fluid h-100 " + styles.image}
            src={image} 
            alt={alt} 
            />
        </MDBCardBody>
        </MDBCard>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${theme.colors.card} !important`,
        borderRadius: "8px !important"
    },
    cardBody: {
        backgroundColor: `${theme.colors.card} !important`,
        borderRadius: "8px !important",
        display: "flex",
        justifyContent: "center"
    },
    image: {
        objectFit: "contain",
        alignSelf: "center",
        borderRadius: "8px !important"
    }
}));

export default WhatWeOfferImageCard;