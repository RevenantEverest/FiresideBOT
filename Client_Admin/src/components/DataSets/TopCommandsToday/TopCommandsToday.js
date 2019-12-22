import React, { Component } from 'react';
import './TopCommandsToday.css';

import PieChart from '../../Charts/PieChart/PieChart';

class TopCommandsToday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: this.props.logs
        }
    }

    renderChart() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
        let logsThisMonth = this.state.logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
        let logsToday = logsThisMonth.filter(el => el.date.trim().split(",")[1].split(" ")[2] === `${date.day}`);

        let temp = [];
        logsToday.forEach(el => {
            if(temp.map(log => log.command).includes(el.command)) return;
            let data = {
                command: el.command,
                amount: logsToday.filter(log => log.command === el.command).length,
                info: logsToday.filter(log => log.command === el.command)
            }
            temp.push(data);
            temp = temp.sort((a, b) => b.amount - a.amount);
        });

        logsToday = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);

        let data = {
            labels: logsToday.map(el => el.command),
            datasets: [{
                data: logsToday.map(el => el.amount),
                backgroundColor: logsToday.map((el, idx) => {
                    if(idx === 0)
                        return "#FF5005";
                    else if(idx === 1)
                        return "#00B39A";
                    else if(idx === 2)
                        return "#CC8218";
                    else return null;
                }).filter(Boolean)
            }]
        };

        return <PieChart data={data} options={{ height: 100, title: `Top Commands Today ( ${months[date.month]} ${date.day} )` }} />
    }

    render() {
        return(
            <div id="TopCommandsToday">
            {this.state.logs ? this.renderChart() : ''}
            </div>
        );
    }
};

export default TopCommandsToday;