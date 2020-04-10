import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBBadge } from 'mdbreact';

import CommandPreview from '../sections/CommandPreview';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCommands() {
        let Commands = this.props.commands.filter(el => { return el.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1; }).map((el, idx) => {
            return(
                <Row style={{ marginBottom: "2%" }} key={idx}>
                    <Col md={6}>
                    <CommandPreview command={el} />
                    </Col>
                </Row>
            );
        });

        return Commands;
    }

    renderBreadcrumb() {
        return(
            <Row style={{ marginBottom: "2%" }}>
                <Col>
                    <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                    <Link to="/categories"><p className="Component-Breadcrumb">/ Categories </p></Link>
                    <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ {this.props.category}</p>
                </Col>
            </Row>
        );
    }

    renderLinkHeader() {
        return <Link to={`/categories/${this.props.category.toLowerCase()}`}><h1 className="Component-Header">{this.props.category}</h1></Link>
    }

    renderHelmet() {
        return(
            <Helmet>
                <title>FiresideBOT | {this.props.category} Commands</title>
                <meta name="theme-color" content="#ff9900" />
                <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`FiresideBOT | ${this.props.category} Commands`} />
                <meta property="og:description" content={`Learn how to use the ${this.props.category} Category of Commands`} />
                <meta property="og:url" content="https://firesidebot.com" />
                <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
            </Helmet>
        );
    }

    render() {
        return(
            <div id="Category" className={this.props.page ? "app-page" : ""}>
                {this.props.page ? this.renderHelmet() : ''}
                <Container style={!this.props.page ? { paddingLeft: 0 } : {}}>
                <Row>
                    <Col>
                        {!this.props.page ? this.renderLinkHeader() : <h1 className="Component-Header">{this.props.category}</h1>}
                    </Col>
                </Row>
                {this.props.page ? this.renderBreadcrumb() : ''}
                <Row style={{ marginBottom: "3%" }}>
                    <Col>
                    <MDBBadge color="dark" className="display-inline">{`<param>`}</MDBBadge>
                    <h6 className="h6 display-inline"> is a required param and </h6>
                    <MDBBadge color="dark" className="display-inline">{`[param]`}</MDBBadge>
                    <h6 className="h6 display-inline"> is an optional param.</h6>
                    </Col>
                </Row>
                {this.renderCommands()}
                </Container>
            </div>
        );
    }
};

export default Category;