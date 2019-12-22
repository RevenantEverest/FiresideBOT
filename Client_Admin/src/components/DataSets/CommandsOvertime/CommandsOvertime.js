import React, { Component } from 'react';
import './CommandsOvertime.css';

import LineChart from '../../Charts/LineChart/LineChart';

class CommandsOvertine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: this.props.logs
        }
    }

    renderChart() {
        const monthNames = { 
            "January": 1, 
            "February": 2, 
            "March": 3, 
            "April": 4, 
            "May": 5, 
            "June": 6, 
            "July": 7, 
            "August": 8, 
            "September": 9, 
            "October": 10, 
            "November": 11, 
            "December": 12
        };
        
        let logsOverThreeMonths = this.state.logs;

        let temp = [];
        logsOverThreeMonths.forEach(el => {
            const elDate = el.date.split(",")[1].split(" ")[1];
            if(temp.map(log => log.month).includes(elDate)) return;
            let data = {
                month: elDate,
                commandUses: logsOverThreeMonths.filter(log => log.date.split(",")[1].split(" ")[1] === elDate).length,
                info: logsOverThreeMonths.filter(log => log.date.split(",")[1].split(" ")[1] === elDate)
            }
            temp.push(data);
        });

        logsOverThreeMonths = temp.map((el, idx) => idx < 3 ? temp[temp.length - (idx + 1)] : null).filter(Boolean);
        logsOverThreeMonths = logsOverThreeMonths.sort((a, b) => monthNames[a.month] - monthNames[b.month]);

        let data = {
            labels: logsOverThreeMonths.map(el => el.month),
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
                data: logsOverThreeMonths.map(el => el.commandUses)
              }
            ]
        };

        return <LineChart data={data} options={{ height: 100, title: `Command Use Over Last 3 Months` }} />
        // Use 3 month sequence
        // Reduce logs to last 3 months
        // Map to show command use per day
        // Format
    }

    render() {
        return(
            <div id="CommandsOvertime">
            {this.state.logs ? this.renderChart() : ''}
            </div>
        );
    }
};

export default CommandsOvertine;