import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';

import Breadcrumb from '../sections/Breadcrumb';
import Spinner from '../sections/Spinner';
import ChangelogDisplay from '../sections/ChangelogDisplay';

import changelogServices from '../../services/changelogServices';

class PublishedChangelogs extends Component {

    _isMounted = false;

    _Routes = [
        { to: "/changelogs/published", pathname: "Changelogs" },
        { main: true, pathname: "Published" }
    ];

    constructor(props) {
        super(props);
        this.state = {
            helloWorld: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getChangelogs();
    }

    componentWillUnmount = () => this._isMounted = false;

    getChangelogs() {
        if(!this._isMounted) return;
        changelogServices.getChangelogs()
        .then(changelogs => this.setState({ changelogs: changelogs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <div id="PublishedChangelogs" className="app-page mb-5">
                <Container fluid>
                <Breadcrumb routes={this._Routes} />
                <Row className="mt-2">
                    <Col>
                    <Link to="/changelogs/working">
                    <MDBBtn color="elegant" className="Button-dark ml-0" size="md">
                        Jump to Working Changelogs
                        <FontAwesomeIcon className="ml-2" icon="arrow-circle-right" />
                    </MDBBtn>
                    </Link>
                    </Col>
                </Row>
                {
                    this.state.dataReceived ? 
                    <ChangelogDisplay changelogs={this.state.changelogs} /> : 
                    <Spinner className="mt-4" dataReceived={this.state.dataReceived} />
                }
                </Container>
            </div>
        );
    }
};

export default PublishedChangelogs;