import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { 
    MDBCard,
    MDBCardHeader,
    MDBBtn 
} from 'mdbreact';

class ChangelogDisplay extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            collapseID: ""
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if(!this._isMounted) return;
        this.setState({ canRender: true });
    }

    componentWillUnmount = () => this._isMounted = false;

    componentDidUpdate(prevProps) {
        if(this.props.changelogs.length !== prevProps.changelogs.length) {
            this.setState({ canRender: true });
        }
    }
    
    renderChangelogs() {
        let Changelogs = this.props.changelogs.map((el, idx) => {
            return(
                <Col md={4} className="mb-2" key={idx}>
                    <MDBCard>
                    <MDBCardHeader tag="div">
                        <Row>
                        <Col className="mt-2">
                            {el.type} v{el.version} 
                        </Col>
                        <Col className="d-flex flex-row-reverse">
                            <Link to={{
                                pathname: `/changelogs/${this.props.canPublish ? "working" : "published"}/${el.id}`,
                                state: {
                                    userData: this.props.userData,
                                    manageServer: this.props.manageServer,
                                    canPublish: this.props.canPublish,
                                    changelog: el
                                }
                            }}>
                            <MDBBtn color="" className="elegant-color-dark" size="sm">View</MDBBtn>
                            </Link>
                        </Col>
                        </Row>
                    </MDBCardHeader>
                    </MDBCard>
                </Col>
            );
        });

        return(
            <div className="mt-4">
            <Row>
            {Changelogs}
            </Row>
            </div>
        );
    }

    render() {
        return(
            <div className="ChangelogDisplay">
            {this.renderChangelogs()}
            </div>
        );
    }
};

export default ChangelogDisplay;