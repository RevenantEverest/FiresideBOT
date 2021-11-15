import React from 'react';
import { makeStyles, useTheme } from '@fluentui/react-theme-provider';
import { Link } from 'react-router-dom';
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

function Breadcrumb({ routes }) {

    const styles = useStyles();

    const renderBreadcrumbRoutes = () => {
        return routes.map((route, index) => {
            const lastRoute = (routes.length - 1) === index;
            return(
                <MDBBreadcrumbItem className={lastRoute ? styles.active : styles.breadcrumbItem} active={lastRoute}>
                    {lastRoute ? route.title : <Link to={route.path} className={styles.link}>{route.title}</Link>}
                </MDBBreadcrumbItem>
            );
        });
    };

    return(
        <MDBBreadcrumb className={styles.container}>
            <MDBBreadcrumbItem className={styles.breadcrumbItem}>
                <Link to="/" className={styles.link}>Home</Link>
            </MDBBreadcrumbItem>
            {renderBreadcrumbRoutes()}
        </MDBBreadcrumb>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: `${theme.colors.card} !important`
    },
    breadcrumbItem: {
        color: `${theme.colors.primary} !important`
    },
    link: {
        color: `${theme.colors.primary} !important`,
        ':hover': {
            borderBottom: `1px solid ${theme.colors.primary}`
        }
    },
    active: {
        color: `${theme.colors.mutedText} !important`
    }
}));

export default Breadcrumb;