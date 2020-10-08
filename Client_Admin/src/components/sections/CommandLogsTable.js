import React, { Component } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

class CommandLogsTable extends Component {

    constructor(props) {
        super(props);
        this.setState = {};
    }

    render() {
        return(
            <div>
            <MDBDataTableV5
            className="white-text"
            entriesOptions={[5, 10, 15, 25, 100]} 
            entries={5} 
            pagesAmount={this.props.data.length} 
            data={this.props.data} 
            searchTop 
            searchBottom={false}
            order={['id', 'desc']} />
            </div>
        );
    }
    
}

export default CommandLogsTable