import React, { Component } from 'react';
import './FlagsTable.css';

class FlagsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        }
    }

    renderTable() {
        let TableData = this.state.tableData.map((el, idx) => {
            return(
                <tr className="Flags-TR" key={idx}>
                    <td className="Flags-TD">{el.flag}</td>
                    <td className="Flags-TD">{el.desc}</td>
                </tr>
            );
        });

        return(
            <table className="Flags-Table">
                <tbody className="Flags-Tbody">
                    <tr className="Flags-TR-Header">
                        <th className="Flags-TH">Flag</th>
                        <th className="Flags-TH">Description</th>
                    </tr>
                    {TableData}
                </tbody>
            </table>
        );
    }

    render() {
        return(
            <div id="FlagsTable">
                <div className="FlagsTable-Contents">
                    {this.props ? this.renderTable() : ''}
                </div>
            </div>
        );
    }
};

export default FlagsTable;