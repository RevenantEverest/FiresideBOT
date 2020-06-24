import React, { Component } from 'react';
import './WeeklyCommands.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBadge
} from 'mdbreact';

class WeeklyCommands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: this.props.logs
        }
    }

    searchDateIndex(value, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].date === value)
                return i;
        }
    }

    renderCommandsUsed() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
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
        const today = new Date();
        const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
        let logsThisMonth = this.state.logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month]);
        let logsLastMonth = this.state.logs.filter(el => el.date.split(",")[1].split(" ")[1] === months[date.month - 1])
        let logs = logsThisMonth.concat(logsLastMonth);

        let temp = [];
        logs.forEach(el => {
            const elDate = el.date.split(",")[1];
            if(temp.map(log => log.date.split(",")[1]).includes(elDate)) return;
            let data = {
                date: el.date,
                commandsUsed: logs.filter(log => log.date.split(",")[1] === elDate).length,
                info: logs.filter(log => log.date.split(",")[1] === elDate)
            }
            temp.push(data);
        });
        logs = temp.sort((a, b) => monthNames[a.date.split(",")[1].split(" ")[1]] - monthNames[b.date.split(",")[1].split(" ")[1]]);
        let recentSunday = logs.filter(el => el.date.split(",")[0] === "Sunday");
        recentSunday = recentSunday[recentSunday.length - 1];

        let thisWeek = [];
        let lastWeek = [];
        let recentSundayIndex = this.searchDateIndex(recentSunday.date, logs);
        for(let i = 0; i < 7; i++) {
            thisWeek.push(logs[recentSundayIndex + i]);
            lastWeek.push(logs[recentSundayIndex - i]);
        }

        thisWeek = thisWeek.filter(Boolean).map((el, idx) => el.commandsUsed).reduce((a, b) => a + b, 0);
        lastWeek = lastWeek.filter(Boolean).map((el, idx) => el.commandsUsed).reduce((a, b) => a + b, 0);

        let percentDifference = Math.round(((thisWeek / lastWeek) - 1) * 100) / 100 * 100;

        return(
            <Col md={4} className="WeeklyWrapUp-Col">
                <MDBCard style={{ background: "#0c0c0c", color: "inherit" }} className="cascading-admin-card">
                <div className="admin-up">
                <FontAwesomeIcon icon="magic" className="Admin-FontAwesomeIcon cyan" />
                    <div className="data">
                    <p>COMMANDS USED</p>
                    <h4>
                        <strong>{thisWeek}</strong>
                    </h4>
                    </div>
                </div>
                <MDBCardBody>
                    <div className="progress">
                    <div aria-valuemax="100" aria-valuemin="0" aria-valuenow={Math.abs(percentDifference)} className="progress-bar cyan" role="progressbar"
                        style={{width: `${Math.abs(percentDifference)}%`}}></div>
                    </div>
                    <MDBCardText style={{ color: "inherit" }} tag="div">
                        {percentDifference > 0 ? "Better" : "Worse"} than last week ({percentDifference > 0 ? percentDifference : (Math.abs(percentDifference))}%)
                        <MDBBadge color={percentDifference > 0 ? "success" : "danger"} style={{ width: "30px", display: "inline-block", marginLeft: "2%", fontSize: "8px" }}>
                            <FontAwesomeIcon icon={percentDifference > 0 ? "arrow-up" : "arrow-down"} />
                        </MDBBadge>
                    </MDBCardText>
                </MDBCardBody>
                </MDBCard>
            </Col>
        );
    }

    render() {
        return this.state.logs ? this.renderCommandsUsed() : '';
    }
};

export default WeeklyCommands;