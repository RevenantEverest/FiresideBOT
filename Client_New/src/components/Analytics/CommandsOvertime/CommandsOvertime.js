import React, { Component } from 'react';
import './CommandsOvertime.css';

import Spinner from 'react-bootstrap/Spinner';
import LineChart from '../Charts/LineChart/LineChart';

import commandLogServices from '../../../services/commandLogServices';

class CommandsOvertine extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            logs: this.props.logs
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCommandsOvertime();
    }

    componentWillUnmount = () => this._isMounted = false;
    
    getCommandsOvertime() {
        if(!this._isMounted) return;
        commandLogServices.getCommandsOvertimeByGuild(this.props.manageServer.id)
        .then(logsOvertime => {
            console.log(logsOvertime.data);
            this.setState({ logsOvertime: logsOvertime.data.data, dataReceived: true })
        })
        .catch(err => console.error(err));
    }

    renderChart() {       
        let logsOvertime = this.state.logsOvertime;
        let data = {
            labels: logsOvertime.map(el => el.month),
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
                data: logsOvertime.map(el => el.commandUses)
              }
            ]
        };

        return <LineChart data={data} options={{ height: 100, title: `Command Use Over Last 3 Months` }} />
    }

    render() {
        return(
            <div id="CommandsOvertime">
            {this.state.dataReceived ? this.renderChart() : <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>}
            </div>
        );
    }
};

export default CommandsOvertine;