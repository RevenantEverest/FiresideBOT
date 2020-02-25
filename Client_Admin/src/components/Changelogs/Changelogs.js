import React, { Component } from 'react';
import './Changelogs.css';

import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBBtn,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBFormInline
} from 'mdbreact';

import EditChangelog from '../EditChangelog/EditChangelog';

import changelogServices from '../../services/changelogServices';

import Skin from '../../res/Skin';

class Changelogs extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getChangelogs();
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    toggleEditModal = nr => () => {
        let modalNumber = 'edit' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    toggleDeleteModal = nr => () => {
        let modalNumber = 'delete' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findEditModal = (index) => this.state[("edit" + index)];
    findDeleteModal = (index) => this.state[("delete" + index)];

    getChangelogs() {
        if(!this._isMounted) return;
        changelogServices.getChangelogs()
        .then(changelogs => this.setState({ changelogs: changelogs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    deleteChangelog(el, modal) {
        changelogServices.deleteChangelog(el.id)
        .then(() => {
            let modalNumber = 'delete' + modal;
            this.setState({[modalNumber]: !this.state[modalNumber]}, () => {
                this.getChangelogs();
            });
        })
        .catch(err => console.error(err));
    }

    renderChangelogs() {
        if(this.state.changelogs.length < 1) return <h5 className="h5">No Changelogs</h5>
        let Changelogs = this.state.changelogs.filter(el => { return el.version.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            idx++;
            return(
                <Col key={idx} lg={12}>
                <MDBBtn color="elegant" style={{ marginBottom: "1rem", width: " 250px" }} onClick={this.toggleCollapse(`basicCollapse${idx + 1}`)}>
                {el.version} {el.type} | {el.release_date}
                </MDBBtn>
                <MDBCollapse id={`basicCollapse${idx + 1}`} isOpen={this.state.collapseID}>
                    <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardBody>
                        <MDBBtn color={Skin.MDBColor} className="Button" size="sm" onClick={this.toggleEditModal((idx + 1))}>Edit</MDBBtn>
                        <MDBBtn color="elegant" size="sm" onClick={this.toggleDeleteModal((idx + 1))}>
                        <FontAwesomeIcon icon="trash-alt" />
                        </MDBBtn>
                        <MDBCardText tag="div">
                            <ReactMarkdown source={el.content} />
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBModal isOpen={this.findDeleteModal((idx + 1))} toggle={this.toggleDeleteModal((idx + 1))} centered>
                    <MDBModalHeader toggle={this.toggleDeleteModal((idx + 1))} className="Modal">
                    <h4 className="h4 display-inline">Are you sure you want to delete </h4>
                    <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.version}</h4>
                    <h4 className="h4 display-inline">?</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <MDBBtn color="elegant" onClick={this.toggleDeleteModal((idx + 1))}>Close</MDBBtn>
                        <MDBBtn color={Skin.MDBColor} className="Button" onClick={() => this.deleteChangelog(el, (idx + 1))}>Delete Changelog</MDBBtn>
                    </MDBModalBody>
                    </MDBModal>
                    
                    <MDBModal isOpen={this.findEditModal((idx + 1))} toggle={this.toggleEditModal((idx + 1))} size="fluid">
                    <MDBModalHeader toggle={this.toggleEditModal((idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Edit Changelog </h4>
                    <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.version}</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <EditChangelog 
                        userData={this.props.userData} 
                        changelog
                        changelogData={el} 
                        getChangelogs={this.props.getChangelogs}
                        closeModal={this.toggleEditModal((idx + 1))}
                        />
                    </MDBModalBody>
                    </MDBModal>
                </MDBCollapse>
                </Col>
            );
        });

        return Changelogs;
    }

    render() {
        return(
            <div id="Changelogs">
                <Container>
                <Row style={{ marginBottom: "2%" }}>
                    <Col lg={10} md={2} sm={2}>
                    <MDBFormInline className="md-form" >
                        <FontAwesomeIcon icon="search" />
                        <input 
                        className="form-control ml-3" 
                        style={{ background: "transparent", color: "#cccccc" }} 
                        type="text"
                        name="search"
                        placeholder="Search" 
                        aria-label="Search"
                        onChange={this.handleChange}
                        />
                    </MDBFormInline>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.state.dataReceived ? this.renderChangelogs() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default Changelogs;