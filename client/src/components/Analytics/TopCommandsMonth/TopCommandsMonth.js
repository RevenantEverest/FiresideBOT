import React, { Component } from 'react';
import './TopCommandsMonth.css';

import Spinner from 'react-bootstrap/Spinner';
import PieChart from '../Charts/PieChart/PieChart';

import guildAnalyticsServices from '../../../services/GuildServices/guildAnalyticsServices';

class TopCommandsMonth extends Component {

	_isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
        }
	}

	componentDidMount() {
		this._isMounted = true;
		this.getTopCommandsMonth();
	}

	componentWillUnmount = () => this._isMounted = false;

	getTopCommandsMonth() {
		if(!this._isMounted) return;
		guildAnalyticsServices.getTopCommandsThisMonth(this.props.manageServer.id)
		.then(logsThisMonth => this.setState({ logsThisMonth: logsThisMonth.data.data, dataReceived: true }))
		.catch(err => console.error(err));
	}
	
	renderChart() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
		
		let logsThisMonth = this.state.logsThisMonth;

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
            {this.state.dataReceived ? this.renderChart() : <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>}
            </div>
        );
    }
};

export default TopCommandsMonth;