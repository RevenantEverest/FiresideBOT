import React, { Component } from 'react';
import './PremiumFAQ.css';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCollapse,
    MDBCollapseHeader,
    MDBIcon
} from 'mdbreact';

class PremiumFAQ extends Component {

    constructor() {
        super();
        this.state = {};
    }

    toggleCollapse(collapseID) {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        const { collapseID } = this.state;
        return(
            <div id="PremiumFAQ">
                <Container>
                <Row>
                    <Col className="text-center">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Premium FAQ
                    </h2>
                    <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam.
                    </p>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5%" }}>
                    <Col>
                    <Container className='md-accordion mt-5'>
                    <MDBCard className='mt-3' style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse1')}
                        >
                        What is Fireside Premium?
                        <MDBIcon icon={collapseID === 'collapse1' ? 'angle-up' : 'angle-down'} />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse1' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse2')}
                        >
                        Can I get a refund?
                        <MDBIcon
                            icon={collapseID === 'collapse2' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse2' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            non cupidatat skateboard dolor brunch. Food truck quinoa
                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                            put a bird on it squid single-origin coffee nulla assumenda
                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                            excepteur butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt you probably
                            haven&apos;t heard of them accusamus labore sustainable VHS.
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse3')}
                        >
                        Can I stop my subscription anytime?
                        <MDBIcon
                            icon={collapseID === 'collapse3' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse3' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            non cupidatat skateboard dolor brunch. Food truck quinoa
                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                            put a bird on it squid single-origin coffee nulla assumenda
                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                            excepteur butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt you probably
                            haven&apos;t heard of them accusamus labore sustainable VHS.
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse4')}
                        >
                        How do I redeem Server Premium?
                        <MDBIcon
                            icon={collapseID === 'collapse4' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse4' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            non cupidatat skateboard dolor brunch. Food truck quinoa
                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                            put a bird on it squid single-origin coffee nulla assumenda
                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                            excepteur butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt you probably
                            haven&apos;t heard of them accusamus labore sustainable VHS.
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse5')}
                        >
                        What is the money used for?
                        <MDBIcon
                            icon={collapseID === 'collapse5' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse5' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            non cupidatat skateboard dolor brunch. Food truck quinoa
                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                            put a bird on it squid single-origin coffee nulla assumenda
                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                            excepteur butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt you probably
                            haven&apos;t heard of them accusamus labore sustainable VHS.
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>
                    </Container>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default PremiumFAQ;