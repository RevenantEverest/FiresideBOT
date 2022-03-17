import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCollapse,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem
} from 'mdbreact';

import GuildQueueDisplay from './GuildQueueDisplay';

class ServerQueuesDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    renderServerQueues() {
        let servers = this.props.servers.filter(el => el.queue.isPlaying);
        let Guilds = servers.map((el, idx) => {
            return(
                <Col md={4} key={idx}>
                    <GuildQueueDisplay guild={el} />
                </Col>
            );
        });

        if(Guilds.length > 3) {
            let itemAmount = Math.ceil(servers.length / 3);
            let content = [];
    
            for(let i = 0; i < itemAmount; i++) {
                content.push(
                    <MDBCarouselItem itemId={i + 1} key={`ci-${i}`}>
                    <Row>
                    {this.renderCarouselGuilds(Guilds, i)}
                    </Row>
                    </MDBCarouselItem>
                );
            }
    
            return(
                <MDBCarousel activeItem={1} length={itemAmount} slide={true} showControls={true} multiItem>
                    <MDBCarouselInner>
                    <Row>
                        {content}
                    </Row>
                    </MDBCarouselInner>
                </MDBCarousel>
            );
        }
        else return <Row>{Guilds}</Row>;
        
    }

    renderCarouselGuilds(Guilds, i) {
        i = i + 1;
        let temp = [];
        for(let idx = 0; idx < Guilds.length; idx++) {
            if(idx < ((i * 3))) {
                if(idx >= ((i - 1) * 3) || ((i - 1) * 3) <= 0)
                    temp.push(Guilds[idx]);
            }
        }
        return temp;
    }

    render() {
        return(
            <div className="ServerQueuesDisplay">
                <Container fluid className="pr-0 pl-0">
                <Row>
                    <Col>
                    <MDBCard>
                    <MDBCardHeader className="card-header pointer" onClick={this.toggleCollapse("ServersQueueDisplay")}>
                        Server Queue Display
                        <FontAwesomeIcon className="ml-2" icon="angle-right" />
                    </MDBCardHeader>
                    <MDBCollapse id={"ServersQueueDisplay"} isOpen={this.state.collapseID}>
                        <MDBCardBody className="card-body">
                            {this.renderServerQueues()}
                        </MDBCardBody>
                    </MDBCollapse>
                    </MDBCard>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default ServerQueuesDisplay;