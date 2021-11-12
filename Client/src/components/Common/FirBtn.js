import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@fluentui/react-theme-provider';
import { MDBBtn } from 'mdbreact';

function FirBtn(props) {

    const { children, className, ...restProps } = props;
    const theme = useTheme();

    return(
        <MDBBtn className={[className, theme.classNames.button].join(" ")} {...restProps}>
            {children}
        </MDBBtn>
    );
};

FirBtn.defaultProps = {
    action: false,
    active: false,
    block: false,
    circle: false,
    className: "",
    color: "orange",
    disabled: false,
    flat: false,
    floating: false,
    outline: false,
    rounded: false,
    size: "md"
};

FirBtn.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.bool,
    active: PropTypes.bool,
    block: PropTypes.bool,
    circle: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    flat: PropTypes.bool,
    floating: PropTypes.bool,
    href: PropTypes.string,
    innerRef: PropTypes.object,
    outline: PropTypes.bool,
    role: PropTypes.string,
    rounded: PropTypes.bool,
    size: PropTypes.string,
    tag: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.string
};

export default FirBtn;