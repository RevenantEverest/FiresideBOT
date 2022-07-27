import React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import ReactMarkdown from 'react-markdown';

function Markdown({ children }) {

    const styles = useStyles();

    return(
        <ReactMarkdown className={styles.markdown}>
            {children}
        </ReactMarkdown>
    );
};

const useStyles = makeStyles((theme) => ({
    markdown: {
        'h1': { color: `${theme.colors.text} !important` },
        'h2': { color: `${theme.colors.text} !important` },
        'h3': { color: `${theme.colors.text} !important` },
        'h4': { color: `${theme.colors.text} !important` },
        'h5': { color: `${theme.colors.text} !important` },
        'h6': { color: `${theme.colors.text} !important` },
        'p': { color: `${theme.colors.mutedText} !important` },
        'ul': { color: `${theme.colors.mutedText} !important` },
        'ol': { color: `${theme.colors.mutedText} !important` },
        'code': { color: `${theme.colors.secondary} !important` }
    }
}));

export default Markdown;