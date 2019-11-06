import React, { Component } from 'react';
import './Category.css';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commands: this.props.commands
        }
    }

    render() {
        return(
            <div id="Category">
            </div>
        );
    }
}