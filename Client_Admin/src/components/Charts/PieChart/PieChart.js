import React, { Component } from 'react';
import './PieChart.css';

import { Pie } from 'react-chartjs-2';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardText } from 'mdbreact';

/*

Data Formatting Example: 

{
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

*/

class PieChart extends Component {

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
            <div id="PieChart">
            <MDBCard style={{ background: "#151515" }}>
                <MDBCardHeader>{this.state.options.title}</MDBCardHeader>
                <MDBCardBody style={{ background: "#0a0a0a" }}>
                    <MDBCardText tag="div">
                        <Pie
                        data={this.state.data} 
                        legend={this.legendOptions}
                        />
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
            </div>
        );
    }
};

export default PieChart;