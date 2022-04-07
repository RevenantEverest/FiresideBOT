import React, { Component } from 'react';
import './EmbedColorPicker.css';

import { ChromePicker } from 'react-color';

class EmbedColorPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: '#fff'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(color, event) {
        this.setState({ background: color.hex }, () => this.props.chooseColor(color.hex));
    } 

    render() {
        return(
            <ChromePicker color={this.state.background} onChange={this.handleChange} />
        );
    }
};

export default EmbedColorPicker;