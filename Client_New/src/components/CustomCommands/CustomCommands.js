import React, { Component } from 'react';
import './CustomCommands.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBFormInline, 
    MDBBtn 
} from 'mdbreact';

import AddCustomCommand from '../AddCustomCommand/AddCustomCommand';
import EditCustomCommand from '../EditCustomCommand/EditCustomCommand';

import customCommandServices from '../../services/customCommandServices';
import commandServices from '../../services/commandServices';

import Skin from '../../res/Skin';

class CustomCommands extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.userData,
            manageServer: this.props.manageServer,
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.getCustomCommands = this.getCustomCommands.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCustomCommands();
        this.getCommands();
    }

    componentWillUnmount = () => this._isMounted = false;

    toggleModal = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    togglePreviewModal = nr => () => {
        let modalNumber = 'preview' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    toggleEditModal = nr => () => {
        let modalNumber = 'edit' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    toggleDeleteModal = nr => () => {
        let modalNumber = 'delete' + nr;
        this.setState({[modalNumber]: !this.state[modalNumber]});
    }

    findModal = (index) => this.state[("modal" + index)];
    findPreviewModal = (index) => this.state[("preview" + index)];
    findEditModal = (index) => this.state[("edit" + index)];
    findDeleteModal = (index) => this.state[("delete" + index)];

    getCustomCommands() {
        if(!this._isMounted) return setTimeout(() => this.getCustomCommands(), 2000);
        if(!this.state.manageServer) return;
        customCommandServices.getByGuildId(this.state.manageServer.id)
        .then(custCommands => this.setState({ customCommandData: custCommands.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    getCommands() {
        if(!this._isMounted) return setTimeout(() => this.getCustomCommands(), 2000);
        if(!this.state.manageServer) return;
        commandServices.getDefaultCommands()
        .then(commands => this.setState({ defaultCommandData: commands.data.data }))
        .catch(err => console.error(err));
    }

    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    deleteCommand(el) {
        customCommandServices.delete(el.id)
        .then(() => this.getCustomCommands())
        .catch(err => console.error(err));
    }

    renderSpinner() {
        if(!this.state.dataReceived && this.props.manageServer)
            return <Row><Col><Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></Col></Row>;
        else if(!this.state.manageServer)
            return(
                <Row>
                <Col lg={1} style={{ paddingRight: 0 }}>
                <Spinner animation="border" role="status" style={{ display: "inline-block" }}><span className="sr-only">Loading...</span></Spinner>
                </Col>
                <Col style={{ paddingLeft: 0 }}>
                <h5 className="h5" style={{ display: "inline-block", marginLeft: "2%" }}>Please Select A Server To Manage Before Continuing</h5>
                </Col>
                </Row>
            );
    }

    renderCustomCommands() {
        let CustomCommands = this.state.customCommandData.filter(el => { return el.input.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 }).map((el, idx) => {
            idx++;
            let preview = '';
            el.output.split("").forEach((element, index) => index <= 50 ? preview += element : preview += '');
            return(
                <tr key={idx}>
                    <td className="CustomCommands-TD CustomCommands-TD-#">{idx}</td>
                    <td className="CustomCommands-TD CustomCommands-TD-Input">{el.input.charAt(0).toUpperCase() + el.input.slice(1)}</td>
                    <td className="CustomCommands-TD CustomCommands-TD-Output">{el.output.split("").length <= 50 ? el.output : preview + "..."}</td>
                    <td className="CustomCommands-TD CustomCommands-TD-CreatedBy">
                        <Image 
                        className="CustomCommands-TD-Username-Image" 
                        src={(el.avatarUrl ? `https://cdn.discordapp.com/avatars/${el.created_by}/${el.avatarUrl}.png` : "https://i.imgur.com/c26Syzn.jpg")}
                        roundedCircle
                        />
                        {el.discord_username}
                    </td>
                    <td className="CustomCommands-TD CustomCommands-TD-DateCreated">{el.date}</td>
                    <td className="CustomCommands-TD CustomCommands-TD-Action">
                    <Container>
                    <Row>
                        <Col lg={3}>
                            <MDBBtn color="elegant" size="sm" onClick={this.togglePreviewModal((idx + 1))}>
                            <FontAwesomeIcon className="CustomCommands-Icon-Trash" icon="search-plus" />
                            </MDBBtn>
                        </Col>
                        <Col lg={3}>
                            <MDBBtn color="elegant" size="sm" onClick={this.toggleEditModal((idx + 1))}>
                            <FontAwesomeIcon className="CustomCommands-Icon-Trash" icon="edit" />
                            </MDBBtn>
                        </Col>
                        <Col lg={3}>
                            <MDBBtn color="elegant" size="sm" onClick={this.toggleDeleteModal((idx + 1))}>
                            <FontAwesomeIcon className="CustomCommands-Icon-Trash" icon="trash-alt" />
                            </MDBBtn>
                        </Col>
                    </Row>
                    </Container>
                    </td>
                    <MDBModal isOpen={this.findDeleteModal((idx + 1))} toggle={this.toggleDeleteModal((idx + 1))} centered>
                    <MDBModalHeader toggle={this.toggleDeleteModal((idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Are you sure you want to delete the Custom Command </h4>
                    <h4 className="h4 display-inline orange-text">{el.input.charAt(0).toUpperCase() + el.input.slice(1)}</h4>
                    <h4 className="h4 display-inline">?</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <MDBBtn color="elegant" onClick={this.toggleDeleteModal((idx + 1))}>Close</MDBBtn>
                        <MDBBtn color={Skin.hex} style={{ background: Skin.hex }} onClick={() => this.deleteCommand(el)}>Delete</MDBBtn>
                    </MDBModalBody>
                    </MDBModal>
                    
                    <MDBModal isOpen={this.findEditModal((idx + 1))} toggle={this.toggleEditModal((idx + 1))} centered>
                    <MDBModalHeader toggle={this.toggleEditModal((idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Edit Custom Command </h4>
                    <h4 className="h4 display-inline orange-text">{el.input.charAt(0).toUpperCase() + el.input.slice(1)}</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <EditCustomCommand
                        userData={this.state.userData}
                        customCommandData={el}
                        defaultCommands={this.state.defaultCommandData}
                        getCustomCommands={this.getCustomCommands}
                        toggleModal={this.toggleEditModal((idx + 1))}
                        />
                    </MDBModalBody>
                    </MDBModal>

                    <MDBModal isOpen={this.findPreviewModal((idx + 1))} toggle={this.togglePreviewModal((idx + 1))} size="fluid">
                    <MDBModalHeader toggle={this.togglePreviewModal((idx + 1))} tag="div" className="Modal">
                    <h4 className="h4 display-inline">Preview Command</h4>
                    </MDBModalHeader>
                    <MDBModalBody className="Modal">
                        <Container>
                        <Row>
                            <Col>
                                <MDBCard className="w-auto">
                                <MDBCardBody style={{ background: "#1a1a1a", minHeight: "30vh" }}>
                                <Row>
                                <Col lg={5}>
                                    <label>Command Input</label>
                                </Col>
                                </Row>
                                <MDBCardText
                                style={{ 
                                    height: "26vh", 
                                    overflowY: "scroll", 
                                    border: "solid thin #0a0a0a", 
                                    color: "#cccccc",
                                    marginTop: "2%",
                                    marginBottom: "2%",
                                    padding: "2%"
                                }}>
                                {el.input}</MDBCardText>
                                </MDBCardBody>
                                </MDBCard>
                            </Col>
                            <Col>
                                <MDBCard className="w-auto">
                                <MDBCardBody style={{ background: "#1a1a1a", minHeight: "30vh" }}>
                                <Row>
                                <Col lg={5}>
                                    <label>Command Output</label>
                                </Col>
                                </Row>
                                <MDBCardText
                                style={{ 
                                    height: "26vh", 
                                    overflowY: "scroll", 
                                    border: "solid thin #0a0a0a", 
                                    color: "#cccccc",
                                    marginTop: "2%",
                                    marginBottom: "2%",
                                    padding: "2%"
                                }}
                                >
                                {el.output}</MDBCardText>
                                </MDBCardBody>
                                </MDBCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <MDBBtn color="elegant" onClick={this.togglePreviewModal((idx + 1))}>Close</MDBBtn>
                            </Col>
                        </Row>
                        </Container>
                    </MDBModalBody>
                    </MDBModal>
                </tr>
            );
        });

        return(
            <Row className="justify-content-sm-center justify-content-xs-center">
            <Col>
                <Table striped bordered hover variant="dark" id="CustomCommands-Table">
                <thead>
                    <tr>
                    <th className="CustomCommands-TH">#</th>
                    <th className="CustomCommands-TH">Input</th>
                    <th className="CustomCommands-TH">Output</th>
                    <th className="CustomCommands-TH">Created By</th>
                    <th className="CustomCommands-TH">Date Created</th>
                    <th className="CustomCommands-TH">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {CustomCommands}
                </tbody>
                </Table>
            </Col>
            </Row>
        );
    }

    renderSettingsButton() {
        return(
            <Row style={{ marginBottom: "2%" }}>
            <Col lg={10} md={9} sm={8} xs={6}>
            <MDBFormInline className="md-form" style={{ marginTop: 0, marginBottom: 0 }}>
                <FontAwesomeIcon icon="search" style={{ marginRight: "2%" }}/>
                <input 
                className="form-control" 
                style={{ background: "transparent", color: "#cccccc", width: "140px" }} 
                type="text"
                name="search"
                placeholder="Search" 
                aria-label="Search"
                onChange={this.handleChange}
                />
            </MDBFormInline>
            </Col>
            <Col lg={2} md={2} sm={2} xs={6}>
                <MDBBtn 
                color={Skin.hex} 
                className="Button" 
                size="md" 
                style={{ background: Skin.hex, padding: "8px", width: "150px" }}
                onClick={this.toggleModal(1)}
                >
                    Create Command
                </MDBBtn>
                <MDBModal isOpen={this.findModal(1)} toggle={this.toggleModal(1)} centered>
                <MDBModalHeader toggle={this.toggleModal(1)} tag="div" className="Modal">
                <h4 className="h4 display-inline">Create Custom Command</h4>
                </MDBModalHeader>
                <MDBModalBody className="Modal">
                    <AddCustomCommand 
                    userData={this.state.userData}
                    manageServer={this.state.manageServer}
                    defaultCommands={this.state.defaultCommandData}
                    getCustomCommands={this.getCustomCommands} 
                    toggleModal={this.toggleModal(1)}
                    />
                </MDBModalBody>
                </MDBModal>
            </Col>
            </Row>
        );
    }

    render() {
        return(
            <div id="CustomCommands">
                <Container>
                <Row>
                    <Col>
                        <h1 className="Component-Header">Custom Commands</h1>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Link to="/"><p className="Component-Breadcrumb">Home </p></Link>
                        <p className="Component-Breadcrumb Component-Breadcrumb-Main">/ Custom Commands</p>
                    </Col>
                </Row>
                {this.state.dataReceived ? this.renderSettingsButton() : ''}
                {this.state.dataReceived ? this.renderCustomCommands() : this.renderSpinner()}
                </Container>
            </div>
        );
    }
};

export default CustomCommands;