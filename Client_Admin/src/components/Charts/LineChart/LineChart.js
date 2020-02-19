import React, { Component } from 'react';
import './LineChart.css';

import { Line } from 'react-chartjs-2';
import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';

/*

Data Formatting Example:

{
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
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
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

*/

class LineChart extends Component {

    lineChartOptions = {
        scales: {
            xAxes: [{
                barPercentage: 1,
                gridLines: {
                    display: true,
                    color: '#151515'
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    color: '#151515'
                }
            }]
        }
    };

    legendOptions = {
        labels: {
            fontColor: "#cccccc"
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            options: this.props.options
        }
    }

    render() {
        return(
            <div id="LineChart">
            <MDBCard style={{ background: "#1a1a1a" }}>
                <MDBCardHeader style={{ background: "#262626" }}>{this.state.options.title}</MDBCardHeader>
                <MDBCardBody style={{ background: "#0c0c0c" }}>
                    <Line
                    data={this.state.data} 
                    options={this.lineChartOptions}
                    legend={this.legendOptions}
                    />
                </MDBCardBody>
            </MDBCard>
            </div>
        );
    }
};

export default LineChart;