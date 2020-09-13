import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBBadge,
    MDBBtn,
    toast
} from 'mdbreact';

import EditChangelog from './EditChangelog';
import PublishChangelog from './PublishChangelog';
import DeleteChangelog from './DeleteChangelog';

import changelogServices from '../../services/changelogServices';

class Changelog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changelog: this.props.location.state.changelog,
            canPublish: this.props.location.state.canPublish
        };
        this.deleteChangelog = this.deleteChangelog.bind(this);
    }

    toggle = (modal) => () => this.setState({ [modal]: !this.state[modal] });

    deleteChangelog() {
        if(this.state.canPublish)
            changelogServices.deleteWorkingChangelog(this.state.changelog.id)
            .then(() => this.handleRequestSuccess())
            .catch(err => console.error(err));
        else
            changelogServices.deleteChangelog(this.state.changelog.id)
            .then(() => this.handleRequestSuccess())
            .catch(err => console.error(err));
    }

    handleRequestSuccess() {
        this.toggleSuccessNotify();
        this.setState({ fireRedirect: true });
    }

    toggleFailureNotify = (reason) => toast.error(`${reason}`, { position: "top-center", autoClose: 5000 });
    toggleSuccessNotify = () => toast.success("Deleted Successfully", { position: "top-right", autoClose: 5000 });

    render() {
        const {changelog, canPublish} = this.state;
        return(
            <div className="Changelog">
                <Container fluid>
                <Row className="mb-2">
                    <Col>
                    <Link to={`/changelogs/${canPublish ? "working" : "published"}`}>
                        <MDBBtn color="elegant" className="Button-dark ml-0" size="md">
                            <FontAwesomeIcon className="mr-2" icon="arrow-circle-left" />
                            Back to {canPublish ? "Working" : "Published"} Changelogs    
                        </MDBBtn>
                    </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header">
                        {changelog.type} v{changelog.version} 
                        <MDBBadge color="dark" className="ml-2">{changelog.release_date}</MDBBadge>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <Row className="mb-2">
                            <Col>
                            <MDBBtn color="elegant" className="Button-dark ml-0" size="sm"  onClick={this.toggle("editModal")}>Edit</MDBBtn>
                            {canPublish ? <MDBBtn color="mdb-color" size="sm" onClick={this.toggle("publishModal")}>Publish</MDBBtn> : ''}
                            <MDBBtn color="elegant" size="sm" onClick={this.toggle("deleteModal")}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </MDBBtn>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <ReactMarkdown source={changelog.content} />
                            </Col>
                        </Row>
                    </MDBCardBody>
                    </MDBCard>

                    <EditChangelog
                    changelog={changelog}
                    modal={this.state.editModal}
                    toggle={this.toggle("editModal")} />

                    {
                        canPublish ? 
                        <PublishChangelog changelog={changelog} modal={this.state.publishModal} toggle={this.toggle("publishModal")} /> : 
                        ''
                    }

                    <DeleteChangelog
                    canPublish={canPublish}
                    changelog={changelog}
                    handleSubmit={this.deleteChangelog}
                    modal={this.state.deleteModal}
                    toggle={this.toggle("deleteModal")} />
                    </Col>
                </Row>
                {this.state.fireRedirect ? <Redirect to={`/changelogs/${canPublish ? "working" : "published"}`} /> : ""}
                </Container>
            </div>
        );
    }
};

export default Changelog;