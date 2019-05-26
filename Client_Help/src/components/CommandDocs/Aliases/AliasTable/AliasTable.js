import React, { Component } from 'react';
import './AliasTable.css';

class AliasTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        }
    }

    renderTable() {
        let TableData = this.state.tableData.map((el, idx) => {
            return(
                <tr className="Alias-TR" key={idx}>
                    <td className="Alias-TD">{el.alias}</td>
                </tr>
            );
        });

        return(
            <table className="Alias-Table">
                <tbody className="Alias-Tbody">
                    <tr className="Alias-TR-Header">
                        <th className="Alias-TH">Available Aliases</th>
                    </tr>
                    {TableData}
                </tbody>
            </table>
        );
    }

    render() {
        return(
            <div id="AliasTable">
                <div className="AliasTable-Contents">
                    {this.props ? this.renderTable() : ''}
                </div>
            </div>
        );
    }
};

export default AliasTable;