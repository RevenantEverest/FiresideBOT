import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn, ToastContainer } from 'mdbreact';

import Breadcrumb from '../sections/Breadcrumb';
import Spinner from '../sections/Spinner';
import ChangelogDisplay from '../sections/ChangelogDisplay';

import changelogServices from '../../services/changelogServices';
import CreateChangelog from '../sections/CreateChangelog';

class WorkingChangelogs extends Component {

    _isMounted = false;

    _Routes = [
        { to: "/changelogs/working", pathname: "Changelogs" },
        { main: true, pathname: "Working" }
    ];

    constructor(props) {
        super(props);
        this.state = {};
        this.getWorkingChangelogs = this.getWorkingChangelogs.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getWorkingChangelogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    toggle = (modal) => () => this.setState({ [modal]: !this.state[modal] }, () => this.getWorkingChangelogs());

    getWorkingChangelogs() {
        if(!this._isMounted) return;
        changelogServices.getWorkingChangelogs()
        .then(changelogs => this.setState({ changelogs: changelogs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="WorkingChangelogs" className="app-page mb-5">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <ToastContainer position="top-center" autoClose={5000} newestOnTop hideProgressBar={true} />
                <Row className="mt-2">
                    <Col>
                    <Link to="/changelogs/published">
                    <MDBBtn color="elegant" className="Button-dark ml-0" size="md">
                        <FontAwesomeIcon className="mr-2" icon="arrow-circle-left" />
                        Jump to Published Changelogs
                    </MDBBtn>
                    </Link>
                    <MDBBtn color="elegant" className="ml-0" size="md" onClick={this.toggle("createModal")}>
                        Create Changelog
                    </MDBBtn>
                    </Col>
                </Row>
                {
                    this.state.dataReceived ? 
                    <ChangelogDisplay getChangelogs={this.getWorkingChangelogs} changelogs={this.state.changelogs} canPublish={true} /> :
                    <Spinner className="mt-4" dataReceived={this.state.dataReceived} />
                }
                <CreateChangelog 
                modal={this.state.createModal}
                toggle={this.toggle("createModal")} />
                </Container>
            </div>
        );
    }
};

export default WorkingChangelogs;