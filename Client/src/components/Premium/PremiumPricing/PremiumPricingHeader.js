import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';

function PremiumHeader() {

    const styles = useStyles();

    return(
        <div>
            <h2 className={"h1-responsive font-weight-bold text-center mt-5 mb-3 " + styles.text}>
                Our pricing plans
            </h2>
            <p className={"text-center w-responsive mx-auto mb-5 " + styles.subText}>
                Premium is still currently in development. You can view the planned features 
                and pricing below. Check back frequently to stay up to date on the release and 
                addition of new premium features!
            </p>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.colors.text
    },
    subText: {
        color: theme.colors.mutedText,
        fontWeight: "600"
    }
}));

export default PremiumHeader;