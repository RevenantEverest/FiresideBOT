import React, { Component } from 'react';
import './SingleTestimonial.css';

import {
    MDBCol,
    MDBTestimonial,
    MDBAvatar,
    MDBIcon,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBBtn
} from 'mdbreact';

import Skin from '../../../res/Skin';

class SingleTestimonial extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (index) => this.state[("modal" + index)];

    renderStars() {
        let Stars = this.props.stars.map((el, idx) => {
            switch(el) {
                case 1:
                    return <MDBIcon key={idx} icon="star" />;
                case .5:
                    return <MDBIcon key={idx} icon="star-half" />;
                default:
                    return <MDBIcon key={idx} far icon="star" />;
            }
        });

        return(
            <div className="grey-text">
                {Stars}
            </div>
        );
    }

    render() {
        let description = '';
        this.props.review.split("").forEach((el, idx) => idx <= 160 ? description += el : description += '');
        return(
            <MDBCol md="4" className={this.props.mobileDisplay ? "" : "clearfix helloWorld d-none d-md-block"}>
            <MDBTestimonial>
                <MDBAvatar className="mx-auto avatar-test">
                <img
                    src={this.props.image}
                    alt=""
                    className="rounded-circle img-fluid"
                />
                </MDBAvatar>
                <h4 className="font-weight-bold mt-4">{this.props.name}</h4>
                <h6 className="font-weight-bold my-3" style={{ color: "#A42700" }}>
                {this.props.title}
                </h6>
                <p className="font-weight-normal">
                <MDBIcon icon="quote-left" className="pr-2" />
                {this.props.review.split("").length <= 160 ? this.props.review : description += "..."}
                </p>
                <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} size="sm" onClick={this.toggle(1)}>
                View Full
                </MDBBtn>
                <br />
                {this.renderStars()}
                <MDBModal isOpen={this.findModal(1)} toggle={this.toggle(1)} centered>
                <MDBModalHeader toggle={this.toggle(1)} className="Modal Modal-Header" />
                <MDBModalBody className="Modal">
                    <MDBAvatar className="mx-auto avatar-test-modal">
                    <img
                        src={this.props.image}
                        alt=""
                        className="rounded-circle img-fluid"
                    />
                    </MDBAvatar>
                    <h4 className="font-weight-bold mt-4">{this.props.name}</h4>
                    <h6 className="font-weight-bold my-3" style={{ color: "#A42700" }}>
                    {this.props.title}
                    </h6>
                    <p className="font-weight-normal">
                    <MDBIcon icon="quote-left" className="pr-2" />
                    {this.props.review}
                    <br /><br />
                    {this.renderStars()}
                    </p>
                </MDBModalBody>
                </MDBModal>
            </MDBTestimonial>
            </MDBCol>
        );
    }
};

export default SingleTestimonial;