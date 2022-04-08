import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Category from '../pages/Category';
import CommandCount from '../sections/CommandCount';

class Commands extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCategories() {
        let _categories = this.props.commands.map(el => el.category);
        _categories = _categories.filter((el, idx) => _categories.indexOf(el) === idx);
        
        let Categories = _categories.map((el, idx) => {
            let commands = this.props.commands.filter(command => command.category === el);
            if(commands.filter(el => { return el.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1; }).length < 1) return <div />;
            return <Category 
            key={idx}
            search={this.props.search} 
            category={el} 
            commands={this.props.commands.filter(command => command.category === el)}
            />
        });

        return Categories;
    }

    render() {
        return(
            <div id="Commands" className="app-page">
                <Helmet>
                    <title>FiresideBOT | Commands</title>
                    <meta name="theme-color" content="#ff9900" />
                    <meta property="og:image" content="https://i.imgur.com/efYsW7T.png" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="FiresideBOT | Commands" />
                    <meta property="og:description" content="View the full list of Commands for Fireside" />
                    <meta property="og:url" content="https://firesidebot.com" />
                    <meta property="og:site_name" content="FiresideBOT | Discord Bot" />
                </Helmet>
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Commands</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Commands</p>
                    </Col>
                </Row>
                <CommandCount commands={this.props.commands.filter(el => { return el.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1; })} />
                {this.renderCategories()}
                </Container>
            </div>
        );
    }
};

export default Commands;