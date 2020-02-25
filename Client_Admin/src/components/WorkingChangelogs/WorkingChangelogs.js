import React, { Component } from 'react';
import './WorkingChangelogs.css';

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
    MDBModalHeader,
    MDBModalBody,
    MDBFormInline
} from 'mdbreact';

import CreateChangelog from '../CreateChangelog/CreateChangelog';
import EditChangelog from '../EditChangelog/EditChangelog';

import changelogServices from '../../services/changelogServices';

import Skin from '../../res/Skin';

class WorkingChangelogs extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getWorkingChangelogs = this.getWorkingChangelogs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getWorkingChangelogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    toggleModal = (modal, nr) => () => this.setState({[modal + nr]: !this.state[modal + nr]});
    findModal = (modal, index) => this.state[(modal + index)];

    getWorkingChangelogs() {
        if(!this._isMounted) return;
        changelogServices.getWorkingChangelogs()
        .then(changelogs => this.setState({ workingChangelogs: changelogs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    deleteWorkingChangelog(el, modal) {
        changelogServices.deleteWorkingChangelog(el.id)
        .then(() => {
            let modalNumber = 'delete' + modal;
            this.setState({[modalNumber]: !this.state[modalNumber]}, () => {
                this.getWorkingChangelogs();
            });
        })
        .catch(err => console.error(err));
    }

    renderWorkingChangelogs() {
        if(this.state.workingChangelogs.length < 1) return <h5 className="h5">No Working Changelogs</h5>
        let WorkingChangelogs = this.state.workingChangelogs.filter(el => { return el.version.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            idx++;
            return(
                <Col key={idx} lg={12}>
                <MDBBtn color="elegant" style={{ marginBottom: "1rem", width: " 250px" }} onClick={this.toggleCollapse(`basicCollapse${idx + 1}`)}>
                {el.version} {el.type}
                </MDBBtn>
                <MDBCollapse id={`basicCollapse${idx + 1}`} isOpen={this.state.collapseID}>
                    <MDBCard style={{ background: "#1a1a1a", color: "#cccccc" }}>
                    <MDBCardBody>
                        <MDBBtn color={Skin.hex} className="Button" size="sm" onClick={this.toggleModal("edit", (idx + 1))}>Edit</MDBBtn>
                        <MDBBtn color="elegant" size="sm" onClick={this.toggleModal("delete", (idx + 1))}>
                        <FontAwesomeIcon icon="trash-alt" />
                        </MDBBtn>
                        <MDBCardText tag="div">
                            <ReactMarkdown source={el.content} />
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>

                    <MDBModal isOpen={this.findModal("delete", (idx + 1))} toggle={this.toggleModal("delete", (idx + 1))} centered>
                    <MDBModalHeader toggle={this.toggleModal("delete", (idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Are you sure you want to delete </h4>
                    <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.version}</h4>
                    <h4 className="h4 display-inline">?</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <MDBBtn color="elegant" onClick={this.toggleModal("delete", (idx + 1))}>Close</MDBBtn>
                        <MDBBtn color={Skin.MDBColor} className="Button" onClick={() => this.deleteWorkingChangelog(el, (idx + 1))}>Delete Changelog</MDBBtn>
                    </MDBModalBody>
                    </MDBModal>
                    
                    <MDBModal isOpen={this.findModal("edit", (idx + 1))} toggle={this.toggleModal("edit", (idx + 1))} size="fluid">
                    <MDBModalHeader toggle={this.toggleModal("edit", (idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Edit Changelog </h4>
                    <h4 className="h4 display-inline" style={{ fontWeight: 600, color: "orange" }}>{el.version}</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <EditChangelog 
                        userData={this.props.userData} 
                        changelogData={el} 
                        getWorkingChangelogs={this.getWorkingChangelogs}
                        getChangelogs={this.props.getChangelogs}
                        closeModal={this.toggleModal("edit", (idx + 1))}
                        />
                    </MDBModalBody>
                    </MDBModal>
                </MDBCollapse>
                </Col>
            );
        });

        return WorkingChangelogs;
    }

    render() {
        return(
            <div id="WorkingChangelogs">
                <Container>
                <Row>
                    <Col>
                    <MDBBtn color={Skin.hex} className="Button" size="md" onClick={this.toggleModal("create", 1)}>
                    Create Changelog
                    </MDBBtn>
                    <MDBModal isOpen={this.findModal("create", 1)} toggle={this.toggleModal("create", 1)} size="fluid">
                    <MDBModalHeader toggle={this.toggleModal("create", 1)} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Edit Changelog </h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <CreateChangelog 
                        userData={this.props.userData}
                        getWorkingChangelogs={this.getWorkingChangelogs}
                        closeModal={this.toggleModal("create", 1)}
                        />
                    </MDBModalBody>
                    </MDBModal>
                    </Col>
                </Row>
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
                    {this.state.dataReceived ? this.renderWorkingChangelogs() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default WorkingChangelogs;