import React, { Component } from 'react';
import './DisplayChangelogs.css';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBTabPane,
    MDBTabContent,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBBtn
} from 'mdbreact';

import CreateChangelog from '../CreateChangelog/CreateChangelog';
import Changelogs from '../Changelogs/Changelogs';
import WorkingChangelogs from '../WorkingChangelogs/WorkingChangelogs';

import changelogServices from '../../services/changelogServices';

import Skin from '../../res/Skin';

class DisplayChangelogs extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            activeItem: "1"
        }
        this.getWorkingChangelogs = this.getWorkingChangelogs.bind(this);
        this.getChangelogs = this.getChangelogs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getChangelogs();
        this.getWorkingChangelogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggleModal = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (index) => this.state[("modal" + index)];

    getWorkingChangelogs() {
        if(!this._isMounted) return setTimeout(() => this.getWorkingChangelogs(), 2000);
        changelogServices.getWorkingChangelogs()
        .then(changelogs => {
            this.setState({ workingChangelogs: changelogs.data.data, workingChangelogDataReceived: true })
        })
        .catch(err => console.error(err));
    }

    getChangelogs() {
        if(!this._isMounted) return setTimeout(() => this.getChangelogs(), 2000);
        changelogServices.getChangelogs()
        .then(changelogs => {
            this.setState({ changelogs: changelogs.data.data, changelogDataReceived: true })
        })
        .catch(err => console.error(err));
    }

    renderSpinner = () => <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;

    renderChangelogs() {
        return (
        <Changelogs 
        userData={this.state.userData} 
        changelogs={this.state.changelogs} 
        getChangelogs={this.getChangelogs} 
        />
        );
    }

    renderWorkingChangelogs() {
        return(
        <WorkingChangelogs 
        userData={this.state.userData} 
        workingChangelogs={this.state.workingChangelogs} 
        getWorkingChangelogs={this.getWorkingChangelogs} 
        getChangelogs={this.getChangelogs}
        />
        );
    }

    render() {
        return(
            <div id="DisplayChangelogs" style={{ marginTop: "4%" }}>
                <Container>
                <Row>
                    <Col>
                    <MDBBtn color={Skin.MDBColor} className="Button" onClick={this.toggleModal(1)}>Create Changelog</MDBBtn>
                    <MDBModal isOpen={this.findModal(1)} toggle={this.toggleModal(1)} size="fluid">
                    <MDBModalHeader toggle={this.toggleModal(1)} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Create Changelog</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <CreateChangelog 
                        getChangeLogs={this.getChangelogs}
                        getWorkingChangeLogs={this.getWorkingChangelogs} 
                        closeModal={this.toggleModal(1)} 
                        />
                    </MDBModalBody>
                    </MDBModal>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <MDBNav className="nav-tabs mt-5">
                        <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab"
                        style={this.state.activeItem === "1" ? {backgroundColor: "#1f1f1f", color: "#cccccc"} : { background: "transparent", color: "#cccccc", border: "none" }}
                        >
                            Changelogs
                        </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab"
                        style={this.state.activeItem === "2" ? {backgroundColor: "#1f1f1f", color: "#cccccc"} : { background: "transparent", color: "#cccccc", border: "none" }}
                        >
                            Working Changelogs
                        </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel" style={{ marginTop: "2%" }}>
                        {this.state.changelogDataReceived ? this.renderChangelogs() : this.renderSpinner() }
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel" style={{ marginTop: "2%" }}>
                        {this.state.workingChangelogDataReceived ? this.renderWorkingChangelogs() : this.renderSpinner() }
                    </MDBTabPane>
                    </MDBTabContent>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default DisplayChangelogs;