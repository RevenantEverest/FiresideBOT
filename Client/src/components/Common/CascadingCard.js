import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon
} from 'mdbreact';

function CascadingCard({ iconName, title, number, color }) {

    const styles = useStyles();

    return(
        <MDBCard className={styles.card}>
        <div className={"admin-up " + styles.adminUp}>
            <MDBIcon icon={iconName} className={"p-3 " + styles.icon} style={{ backgroundColor: color }} />
            <div className={styles.data}>
                <p className={styles.title}>{title}</p>
                <h4>
                    <strong>{number}</strong>
                </h4>
            </div>
        </div>
        <MDBCardBody className={styles.cardBody}>
            <div className="progress w-100" style={{ backgroundColor: color }}>
                <div 
                className={styles.progressBar}
                role="progressbar"
                aria-valuemax="100" 
                aria-valuemin="0" 
                aria-valuenow="100" 
                />
            </div>
        </MDBCardBody>
        </MDBCard>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: `${theme.colors.cardDark} !important`,
        color: theme.colors.text
    },
    adminUp: {
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "-20px"
    },
    icon: {
        boxShadow: `0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19)`,
        fontSize: "35px",
        color: "#dedede",
        textAlign: "left",
        marginRight: "1rem",
        borderRadius: "3px"
    },
    data: {
        float: "right",
        marginTop: "2rem",
        textAlign: "right"
    },
    title: {
        color: theme.colors.mutedText,
        fontSize: "12px",
        textTransform: "uppercase"
    },
    progressBar: {

    }
}));

export default CascadingCard;