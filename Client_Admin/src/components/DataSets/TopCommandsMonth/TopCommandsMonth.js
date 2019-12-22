import React, { Component } from 'react';
import './TopCommandsMonth.css';

import PieChart from '../../Charts/PieChart/PieChart';

class TopCommandsMonth extends Component {

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

        let temp = [];
        logsThisMonth.forEach(el => {
            if(temp.map(log => log.command).includes(el.command)) return;
            let data = {
                command: el.command,
                amount: logsThisMonth.filter(log => log.command === el.command).length,
                info: logsThisMonth.filter(log => log.command === el.command)
            }
            temp.push(data);
            temp = temp.sort((a, b) => b.amount - a.amount);
        });

        logsThisMonth = temp.map((el, idx) => idx < 3 ? el : null).filter(Boolean);

        let data = {
            labels: logsThisMonth.map(el => el.command),
            datasets: [{
                data: logsThisMonth.map(el => el.amount),
                backgroundColor: logsThisMonth.map((el, idx) => {
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

        return <PieChart data={data} options={{ height: 100, title: `Top Commands For ${months[date.month]}` }} />
    }

    render() {
        return(
            <div id="TopCommandsMonth">
            {this.state.logs ? this.renderChart() : ''}
            </div>
        );
    }
};

export default TopCommandsMonth;