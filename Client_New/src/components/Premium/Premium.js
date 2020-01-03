import React, { Component } from 'react';
import './Premium.css';

import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCollapse,
    MDBCollapseHeader,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBBtn
} from 'mdbreact';
import Skin from '../../res/Skin';

class Premium extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData
        }
    }

    toggleCollapse(collapseID) {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        const { collapseID } = this.state;
        return(
            <div id="Premium" className="black-skin">
                <Container>
                <Row>
                    <Col>
                    <section className="text-center my-5">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Our pricing plans
                    </h2>
                    <p className="grey-text text-center w-responsive mx-auto mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p>
                    <Row>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard pricing>
                            <MDBCardBody style={{ background: "#1a1a1a", height: "850px" }}>
                            <h5 className="font-weight-bold mt-3">User Premium</h5>
                            <div className="price pt-0">
                                <h2 className="number mb-0">5</h2>
                            </div>
                            <ul className="striped mb-1">
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Request Length
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Double</strong> Embers In Each Daily
                                    </p>
                                </li>
                            </ul>
                            <MDBBtn color="elegant" className="mb-4">
                                Select
                            </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard
                            className="card-image"
                            style={{
                            backgroundImage:
                                'url("https://i.imgur.com/OrxckTo.png")'
                            }}
                        >
                            <div className="text-white text-center pricing-card d-flex align-items-center rgba-black-strong py-3 px-3 rounded">
                            <MDBCardBody>
                                <h5 className="font-weight-bold mt-2">User & Server Premium</h5>
                                <div className="price pt-0 deep-orange-text">
                                <h2 className="number mb-0">10</h2>
                                </div>
                                <ul className="striped mb-0">
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Request Length
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Double</strong> Embers In Each Daily
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Server Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Song Length For Server Playlists
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Server Ranks
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Unlimited</strong> Custom Commands
                                    </p>
                                </li>
                                </ul>
                                <MDBBtn color={Skin.hex} style={{ background: Skin.hex }}>
                                Select
                                </MDBBtn>
                            </MDBCardBody>
                            </div>
                        </MDBCard>
                        </Col>
                        <Col lg="4" md="12" className="mb-lg-0 mb-4">
                        <MDBCard pricing>
                            <MDBCardBody style={{ background: "#1a1a1a", height: "850px" }}>
                            <h5 className="font-weight-bold mt-3">Server Premium</h5>
                            <div className="price pt-0">
                                <h2 className="number mb-0">5</h2>
                            </div>
                            <ul className="striped mb-1">
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Server Playlists
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Song Length For Server Playlists
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Server Ranks
                                </p>
                                </li>
                                <li>
                                <p>
                                    <strong>Unlimited</strong> Custom Commands
                                </p>
                                </li>
                            </ul>
                            <MDBBtn color="elegant" className="mb-4">
                                Select
                            </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                        </Col>
                    </Row>
                    </section>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                    Frequently Asked Questions
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
                        Collapsible Group Item #1
                        <MDBIcon
                            icon={collapseID === 'collapse1' ? 'angle-up' : 'angle-down'}
                        />
                        </MDBCollapseHeader>
                        <MDBCollapse id='collapse1' isOpen={collapseID}>
                        <MDBCardBody className="FAQ-CardBody">
                            Pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. 3 wolf moon officia aute, non
                            cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                            bird on it squid single-origin coffee nulla assumenda shoreditch
                            et. Nihil anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                            raw denim aesthetic synth nesciunt you probably haven&apos;t
                            heard of them accusamus labore sustainable VHS.
                        </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>

                    <MDBCard style={{ background: "#1a1a1a", borderColor: "#3c3c3c" }}>
                        <MDBCollapseHeader
                        tagClassName='d-flex justify-content-between'
                        onClick={() => this.toggleCollapse('collapse2')}
                        >
                        Collapsible Group Item #2
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
                        Collapsible Group Item #3
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
                        Collapsible Group Item #4
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
                        Collapsible Group Item #5
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

export default Premium;