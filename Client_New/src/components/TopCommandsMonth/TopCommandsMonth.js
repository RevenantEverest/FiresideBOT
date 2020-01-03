import React, { Component } from 'react';
import './TopCommandsMonth.css';

import PieChart from '../Charts/PieChart/PieChart';

const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class TopCommandsMonth extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div id="TopCommandsMonth">
            <PieChart data={data} options={{ height: 100, title: `Top Commands For December` }} />
            </div>
        );
    }
};

export default TopCommandsMonth;