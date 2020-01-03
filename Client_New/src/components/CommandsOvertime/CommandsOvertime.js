import React, { Component } from 'react';
import './CommandsOvertime.css';

import LineChart from '../Charts/LineChart/LineChart';

let data = {
    labels: ['October','November','December'],
    datasets: [
      {
        label: 'Commands Used',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [243, 381, 986]
      }
    ]
};

class CommandsOvertine extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div id="CommandsOvertime">
            <LineChart data={data} options={{ height: 100, title: `Command Use Over Last 3 Months` }} />
            </div>
        );
    }
};

export default CommandsOvertine;