import React, { Component } from 'react';
import './AutoDJQueue.css';

import { 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBCard,
    MDBCardBody,
    MDBCardHeader
} from 'mdbreact';

class AutoDJQueue extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderQueue() {
        let Cols = [
            { label: "#", field: "id", sort: "asc" }, 
            { label: "Title", field: "title", sort: "asc" },
            { label: "Author", field: "author", sort: "asc" },
            { label: "Duration", field: "duration", sort: "asc" },
            { label: "Link", field: "link", sort: "asc" },
            { label: "Action", field: "action", sort: "asc" }
        ];
        let Rows = this.props.queue.filter((ek, idx) => idx !== 0).map((el, idx) => {
            return { 
                id: idx + 1, 
                title: el.title, 
                author: el.author, 
                duration: el.duration, 
                link: el.link, 
                action: <MDBBtn color="elegant" /> 
            }
        });

        return(
            <MDBCard style={{ background: "#1a1a1a"}}>
            <MDBCardHeader style={{ background: "#262626" }}>Queue</MDBCardHeader>
            <MDBCardBody>
            <MDBTable btn className="AutoDJQueue-Table">
                <MDBTableHead className="AutoDJQueue-TableHeaders" columns={Cols} />
                <MDBTableBody className="AutoDJQueue-TableRows" rows={Rows} />
            </MDBTable>
            </MDBCardBody>
            </MDBCard>
        )
    }

    render() {
        return(
            <div id="AutoDJQueue">
            {this.props.queue ? this.renderQueue() : ''}
            </div>
        );
    }
};

export default AutoDJQueue;