import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBContainer as Container,
    MDBRow as Row,
    MDBCol as Col,
    MDBIcon,
    MDBAnimation
} from 'mdbreact';

function WhyChooseUs() {

    const styles = useStyles();

    const renderContentRow = (contentArr, animationType) => {
        return contentArr.map((content, index) => (
            <MDBAnimation reveal type={animationType} duration=".8s" delay={content.delay} key={index.toString()}>
                <Row className="mb-3">
                <Col size="2">
                    <MDBIcon className={styles.icon} icon={content.iconName} size="2x" />
                </Col>
                <Col size="10">
                    <h5 className={"font-weight-bold mb-3 " + styles.title}>{content.title}</h5>
                    <p className={styles.subText}>{content.description}</p>
                </Col>
                </Row>
            </MDBAnimation>
        ));
    };

    return(
        <Container>
            <h2 className={"h1-responsive font-weight-bold text-center mt-5 mb-3 " + styles.title}>
                Why choose Fireside?
            </h2>
            <p className={"lead w-responsive text-center mx-auto mb-5 " + styles.subText}>
                Fireside is a bot that lets you listen to music you love while also adding great features, moderation tools, 
                and overall improvements to your Discord server. From a casual server, to a community, Fireside bot is a great investment.
            </p>
            <Row>
            <Col md="4">
                {renderContentRow([
                    { 
                        title: "Music", 
                        iconName: "music",
                        description: `
                            Queue up some tunes, and save them to a playlist with our extensive Music funtionality.
                        `,
                        delay: ".5s"
                    },
                    { 
                        title: "Moderation", 
                        iconName: "bolt",
                        description: `
                            Take control of your server with powerful admin and moderation tools.
                        `,
                        delay: "1s"
                    },
                    { 
                        title: "Economy", 
                        iconName: "coins",
                        description: `
                            Reward active members of your server with a server wide currency system.
                        `,
                        delay: "1.5s"
                    }
                ], "fadeInLeft")}
            </Col>
            <Col md="4">
                <img
                className="img-fluid"
                src="https://i.imgur.com/ug9huUj.png"
                alt=""
                />
            </Col>
            <Col md="4">
                {renderContentRow([
                    { 
                        title: "Customized Settings", 
                        iconName: "cogs",
                        description: `
                            Some default setting not to your liking? Change it up with fully customizeable options.
                        `,
                        delay: "2s"
                    },
                    { 
                        title: "Active Developer", 
                        iconName: "user-astronaut",
                        description: `
                            Major updates released at least once a month, and always feature packed.
                        `,
                        delay: "2.5s"
                    },
                    { 
                        title: "Open Source", 
                        iconName: "code",
                        description: `
                            Fireside has been and always will be open source. Feel free to 
                            contribute or check out the project by clicking the github link below.
                        `,
                        delay: "3s"
                    }
                ], "fadeInRight")}
            </Col>
            </Row>
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

export default WhyChooseUs;