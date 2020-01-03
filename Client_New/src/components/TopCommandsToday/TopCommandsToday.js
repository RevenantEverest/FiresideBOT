import React, { Component } from 'react';
import './TopCommandsToday.css';

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

class TopCommandsToday extends Component {
    render() {
        return(
            <div id="TopCommandsToday">
            <PieChart data={data} options={{ height: 100, title: `Top Commands Today ( December 10 )` }} />
            </div>
        );
    }
};

export default TopCommandsToday;