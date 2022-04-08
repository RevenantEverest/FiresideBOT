import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBSelect } from 'mdbreact';

class ChangelogForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [
                { text: "Release", value: "Release" },
                { text: "Patch", value: "Patch" },
                { text: "Hotfix", value: "Hotfix" }
            ]
        };
    }

    render() {
        const { content, version, handleChange, getValue } = this.props;
        return(
            <div className={`ChangelogForm ${this.props.className}`}>
                <Container fluid>
                <Row className="mb-2">
                    <Col>
                        <MDBInput 
                        label="Version" 
                        type="text" 
                        name="version" 
                        value={version}
                        onChange={handleChange} />
                    </Col>
                    <Col>
                        <MDBSelect
                        options={this.state.selectOptions}
                        selected="Choose a changelog type"
                        label={"Type"}
                        getTextContent={getValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={12}>
                    <div className="input-group">
                        <div className="input-group-prepend form_input">
                            <span className="input-group-text form_inputIcon" id="basic-addon">
                            <i className="fas fa-pencil-alt prefix" />
                            </span>
                        </div>
                        <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="8" 
                        name="content"
                        style={{ padding: "10px", height: "270px", width: "90%", overflowY: "scroll" }}
                        value={content}
                        onChange={handleChange}
                        />
                    </div>
                    </Col>
                    <Col lg={6} md={12}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text form_inputIcon" id="basic-addon">
                            <i className="fas fa-scroll prefix" />
                            </span>
                        </div>
                        <div 
                        className="form-input" 
                        ref="markdownContainer" 
                        style={{ padding: "10px", height: "270px", width: "90%", overflowY: "scroll", border: "thin solid gray" }}
                        >
                        <ReactMarkdown source={content} />
                        </div>
                    </div> 
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default ChangelogForm;