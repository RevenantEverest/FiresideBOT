import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon,
    MDBBadge
} from 'mdbreact';
import ReactMarkdown from 'react-markdown';
import { FirBtn } from '../Common';
import { text } from '../../utils';

function MostRecentChangelog({ changelog }) {

    const styles = useStyles();

    if(!changelog) return null;

    const contentArr = changelog.content.split(" ");
    const content = contentArr.slice(6, contentArr.length - 1).join(" ");
    const description = text.truncateText("# " + content, 300)


    return(
        <MDBCard className={styles.card}>
        <MDBCardHeader className={styles.cardHeader}>
            <MDBIcon icon="bullhorn" className={"mr-2 " + styles.icon} />
            What's New
        </MDBCardHeader>
        <MDBCardBody className={styles.cardBody}>
            <MDBCardTitle tag="div" className={styles.title}>
                <h4 className="h4">Changelog v{changelog.version} </h4>
                <h6 className="h6 display-inline">Release Date: </h6>
                <MDBBadge color="dark" className="display-inline">{changelog.release_date}</MDBBadge>
            </MDBCardTitle>
            <MDBCardText tag="div" className={styles.text}>
                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
            </MDBCardText>
            <Link to={`/changelogs/${changelog.version}`}>
                <FirBtn>View Full Changelog</FirBtn>
            </Link>
        </MDBCardBody>
        </MDBCard>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${theme.colors.card} !important`,
        color: theme.colors.text
    },
    cardHeader: {
        backgroundColor: `${theme.colors.cardLight} !important`
    },
    cardBody: {
        backgroundColor: `${theme.colors.card} !important`
    },
    icon: {

    },

}));

export default MostRecentChangelog;