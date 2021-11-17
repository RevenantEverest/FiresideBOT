import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';
import { _Features } from '../../res';

function WhatWeOffer() {

    const styles = useStyles();

    const renderFeatures = () => {
        return _Features.map((feature, index) => (
            <MDBAnimation reveal type="fadeInUp" duration=".8s">
            <Row className="my-5" key={feature.title}>
                <Col className={`d-flex ${index % 2 !== 0 && "text-right"}`}>
                    <div className="align-self-center">
                        <h3 className={"font-weight-bold " + styles.title}>
                            <MDBIcon className={"mr-3 " + styles.icon} icon={feature.iconName} />
                            {feature.title}
                        </h3>
                        <div className={index % 2 !== 0 && "d-flex justify-content-end"}>
                            <Col md="9" className="pl-0 pr-0">
                                <p className={"lead mb-5 " + styles.subText}>
                                    {feature.description}
                                </p>
                            </Col>`
                        </div>
                    </div>
                </Col>
                <Col className={index % 2 !== 0 && "order-first"} md="5">
                    {
                        feature.images.map((image, imageIndex) => (
                            <img className="img-fluid mb-4" src={image} alt={`${feature.title}-${imageIndex}`} key={`${feature.title}-${imageIndex}`} />
                        ))
                    }
                </Col>
            </Row>
            </MDBAnimation>
        ));
    };

    return(
        <Container>
        <h2 className={"h1-responsive font-weight-bold text-center mt-5 mb-3 " + styles.title}>
            What does Fireside do?
        </h2>
        <p className={"lead w-responsive text-center mx-auto mb-5 " + styles.subText}>
            Discover what core features Fireside has to help you build your server!
        </p>
        {renderFeatures()}
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.colors.primary
    },
    title: {
        color: theme.colors.text
    },
    subText: {
        color: theme.colors.mutedText
    }
}));

export default WhatWeOffer;