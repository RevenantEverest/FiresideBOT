import React from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import { MDBTooltip } from 'mdbreact';
import * as Themes from '../../themes';

function ThemeChanger({ changeTheme }) {

    const currentTheme = useTheme();
    const styles = useStyles();

    const themes = Object.keys(Themes).map(el => {
        return {
            name: el.split("Theme")[0],
            ...Themes[el]
        }
    });
    
    const ProjectThemes = themes.map((theme) => {
        let className = styles.themeCircle;

        if(theme.name === currentTheme.name)
            className = className + " " + styles.activeTheme;

        return(
            <MDBTooltip
            domElement
            material
            placement="top"
            key={theme.name}
            >
                <div
                key={theme.name}
                className={className} 
                style={{ background: theme.colors.background }}
                onClick={() => changeTheme(theme.name)}
                />
                <span className={styles.tooltip}>
                    {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} Theme
                </span>
            </MDBTooltip>
        )
    });

    return ProjectThemes;
};

const useStyles = makeStyles((theme) => ({
    themeCircle: {
        height: 20,
        width: 20,
        marginRight: 10,
        borderRadius: 50,
        border: `2px solid ${theme.colors.mutedText}`,
        ':hover': {
            cursor: "pointer"
        }
    },
    activeTheme: {
        border: `2px solid ${theme.colors.primary} !important`
    },
    tooltip: {
        fontWeight: 600
    }
}));

export default ThemeChanger;