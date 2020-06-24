import React, { Component } from 'react';
import './BarChart.css';

import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import { Bar } from 'react-chartjs-2';

/*

Data Formatting Example:

{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: '#1',
            data: [12, 39, 3, 50, 2, 32, 84],
            backgroundColor: '#ff6600',
            borderWidth: 1
        },
        {
            label: '#2',
            data: [56, 24, 5, 16, 45, 24, 8],
            backgroundColor: '#ffcc00',
            borderWidth: 1
        },
        {
            label: '#3',
            data: [12, 25, 54, 3, 15, 44, 3],
            backgroundColor: '#cc0000',
            borderWidth: 1
        }
    ]
};

*/

class BarChart extends Component {

    options = {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            options: this.props.options
        };
    }

    render() {
        return(
            <div id="BarChart">
            <MDBCard>
                <MDBCardBody style={{ background: "#1a1a1a" }}>
                    <MDBCardTitle className="h3 text-center">{this.state.options.title}</MDBCardTitle>
                    <Bar 
                    data={this.state.data} 
                    height={this.state.options.height} 
                    width={this.state.options.width} 
                    options={this.options} 
                    />
                </MDBCardBody>
            </MDBCard>
            </div>
        );
    }
};

export default BarChart;