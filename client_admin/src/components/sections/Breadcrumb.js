import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

class Breadcrumb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes
        };
    }

    renderRoutes() {
        let Routes = this.state.routes.map((el, idx) => {
            let isMain = el.main;
            return(
                <MDBBreadcrumbItem active={isMain ? true : false} key={idx}>
                    {isMain ? el.pathname : <Link to={`${el.to}`}>{el.pathname}</Link>}
                </MDBBreadcrumbItem>
            );
        });

        return Routes;
    }

    render() {
        return(
            <div className="BreadCrumb">
                <Row className={this.props.className}>
                    <Col>
                    <MDBBreadcrumb style={{ background: "#1c1c1c" }}>
                        <MDBBreadcrumbItem><Link to="/">Home</Link></MDBBreadcrumbItem>
                        {this.renderRoutes()}
                    </MDBBreadcrumb>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default Breadcrumb;