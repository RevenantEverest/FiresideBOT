import React, { Component } from 'react';
import './SendEmbed.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBTooltip,
    MDBInput,
    MDBSelect,
    MDBSwitch,
    MDBBtn,
    toast,
    ToastContainer
} from 'mdbreact';
import EmbedPreview from './EmbedPreview/EmbedPreview';
import EmbedColorPicker from './EmbedColorPicker/EmbedColorPicker';

import discordServices from '../../services/discordServices';
import sendEmbedServices from '../../services/sendEmbedServices';

import Skin from '../../res/Skin';

class SendEmbed extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            embed: {},
            fields: []
        };
        this.chooseColor = this.chooseColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleFieldInline = this.handleFieldInline.bind(this);
        this.handleChannelSelectChange = this.handleChannelSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getGuildChannels();
    }

    componentWillUnmount = () => this._isMounted = false;

    getGuildChannels() {
        if(!this._isMounted) return;
        discordServices.getGuildChannels(this.props.manageServer.id)
        .then(channels => this.setState({ channels: channels.data.data.map(el => { return { text: el.name, value: el.id } }), dataReceived: true }))
        .catch(err => console.error(err));
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleFieldChange = (id, e) => {
        let fields = this.state.fields;
        let _field = fields[fields.map(el => el.id).indexOf(id)];
        if(e.target.name === "text")
            _field.text = e.target.value;
        else if(e.target.name === "value")
            _field.value = e.target.value;
        this.setState({ fields: fields });
    }
    handleFieldInline = (id) => {
        let fields = this.state.fields;
        let _field = fields[fields.map(el => el.id).indexOf(id)];
        _field.inline = !_field.inline;
        this.setState({ fields: fields });
    }
    handleChannelSelectChange = (value) => this.setState({ "channel_id": value[0] });

    chooseColor = (hex) => this.setState({ color: hex });

    createField() {
        if(this.state.fieldAmount >= 25) return;
        let fields = this.state.fields;
        fields.push({ id: this.state.fields.length + 1, text: "", value: "", inline: false });
        this.setState({ fields: fields });
    }

    removeField(id) {
        if(this.state.fieldAmount <= 0) return;
        let fields = this.state.fields;
        fields.splice(fields.map(el => el.id).indexOf(id), 1)
        this.setState({ fields: fields });
    }

    clearInput = (ref) => this.setState({ [ref]: "" }, () => document.getElementById(ref).value = "");

    handleSubmit(e) {
        e.preventDefault();

        if(!this.state.channel_id) return this.toggleFailureNotify("No Channel Selected");
        if(this.state.title && this.state.title.split("").length > 256) 
            return this.toggleFailureNotify(`Title exceeds character limit by ${this.state.title.split("").length - 256} characters`);
        for(let i = 0; i < this.state.fields.length; i++) {
            if(this.state.fields[i].text.split("").length === 0) 
                return this.toggleFailureNotify("No Empty Field Text");
            else if(this.state.fields[i].value.split("").length === 0) 
                return this.toggleFailureNotify("No Empty Field Value");
        }

        let data = {
            color: this.state.color ? this.state.color : "3f4346",
            title: this.state.title ? this.state.title : null,
            description: this.state.description ? this.state.description : null,
            thumbnail: this.state.thumbnail ? this.state.thumbnail : null,
            author: {
                name: this.state.author_name ? this.state.author_name : null,
                icon: this.state.author_icon ? this.state.author_icon : null
            },
            fields: this.state.fields,
            footer: {
                name: this.state.footer_name ? this.state.footer_name : null,
                icon: this.state.footer_icon ? this.state.footer_icon : null
            },
            channel_id: this.state.channel_id
        };
        
        sendEmbedServices.sendEmbed(data)
        .then(() => this.toggleSuccessNotify())
        .catch(err => this.toggleFailureNotify(err.response ? err.response.data : ""));
    }

    toggleSuccessNotify = () => toast.success("Embed Sent!", { position: "top-right", autoClose: 5000 });
    toggleFailureNotify = (reason) => toast.error(`ERROR: ${reason}`, { position: "top-right", autoClose: 5000 });

    renderFields() {
        let Fields = this.state.fields.map((el, idx) => {
            return(
                <form id="SendEmbed-Form" key={idx}>
                <Row style={{ marginBottom: "5%" }}>
                <Col lg={2} style={{ paddingRight: 0 }}>
                    <label>Field #{idx + 1}</label>
                </Col>
                <Col>
                    <MDBBtn color="elegant" size="sm" style={{ margin: 0 }} onClick={() => this.removeField(el.id)}>
                        <FontAwesomeIcon icon="trash-alt" />
                    </MDBBtn>
                </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col lg={4}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Text</label>
                        </Col>
                        <Col>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Title of the Field.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col id="SendEmbed-Col">
                            <MDBInput name="text" type="text" hint={el.text} onChange={(e) => this.handleFieldChange(el.id, e)} />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Value</label>
                        </Col>
                        <Col >
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Value of the Field</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col  id="SendEmbed-Col">
                            <MDBInput name="value" type="text" hint={el.value} onChange={(e) => this.handleFieldChange(el.id, e)} />
                        </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Col lg={4} style={{ paddingRight: 0 }}>
                            <label>Inline</label>
                        </Col>
                        <Col >
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>If the field displays next to another field.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col id="SendEmbed-Col">
                            <MDBSwitch checked={el.inline} onChange={() => this.handleFieldInline(el.id)} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                </form>
            );
        })

        return(
            <div>
            {Fields}
            </div>
        );
    }

    renderForm() {
        return(
            <Col lg={6}>
            <MDBCard className="w-100" >
            <MDBCardBody style={{ background: "#1a1a1a", minHeight: "350px", color: "#cccccc" }}>
                <Row style={{ marginBottom: "5%" }}>
                <Col lg={3} style={{ paddingRight: 0 }}>
                    <label>Embed Editor</label>
                </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={1} style={{ paddingRight: 0 }}>
                            <label>Color</label>
                        </Col>
                        <Col lg={8}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Title of the embed.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <EmbedColorPicker chooseColor={this.chooseColor} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={1} style={{ paddingRight: 0 }}>
                            <label>Title</label>
                        </Col>
                        <Col lg={8}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Title of the embed.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="title" name="title" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col lg={9}>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Description</label>
                        </Col>
                        <Col lg={8}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Description of the embed. (Supports Discord Markdown)</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col id="SendEmbed-Col">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text SendEmbed-Textarea-Prepend" id="basic-addon SendEmbed-Description-Prepend">
                                <FontAwesomeIcon icon="pencil-alt" />
                                </span>
                            </div>
                            <textarea id="description" className="form-control SendEmbed-TextArea" rows="5" name="description" onChange={this.handleChange} />
                        </div>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Thumbnail URL</label>
                        </Col>
                        <Col lg={7}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Thumbnail of the embed that appears in the top right corner.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="thumbnail" name="thumbnail" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Author Name</label>
                        </Col>
                        <Col lg={7}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Name of the embed author.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="author_name" name="author_name" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Author Icon</label>
                        </Col>
                        <Col lg={7}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Icon URL of the embed author.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="author_icon" name="author_icon" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Footer Text</label>
                        </Col>
                        <Col lg={7}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Text for the embed footer.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="footer_name" name="footer_name" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                    <Col>
                        <Row>
                        <Col lg={3} style={{ paddingRight: 0 }}>
                            <label>Footer Icon</label>
                        </Col>
                        <Col lg={7}>
                            <MDBTooltip domElement tag="span" placement="right">
                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                <span>Icon URL of the embed footer.</span>
                            </MDBTooltip>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={8} id="SendEmbed-Col">
                            <MDBInput id="footer_icon" name="footer_icon" type="text" onChange={this.handleChange} />
                        </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
                <hr />
                {this.state.fields.length > 0 ? this.renderFields() : ''}
                <Row>
                    <Col>
                    <MDBBtn 
                    color={this.state.fields.length >= 25 ? "elegant" : Skin.hex} 
                    className={this.state.fields.length >= 25 ? "" : "Button"} 
                    size="md" 
                    disabled={this.state.fields.length >= 25 ? true : false}
                    onClick={() => this.createField()}>
                        Create Field
                    </MDBBtn>
                    </Col>
                </Row>
                <br />
                <hr />
                <Row>
                    <Col lg={6} style={{ paddingRight: 0 }}>
                        <MDBSelect
                        search
                        id="SendEmbed-ChannelSelect"
                        options={this.state.channels}
                        selected="Choose a text channel"
                        getValue={this.handleChannelSelectChange}
                        />
                    </Col>
                    <Col>
                    <MDBBtn color={Skin.hex} className="Button" size="md" onClick={this.handleSubmit}>Send Embed</MDBBtn>
                    </Col>
                </Row>
            </MDBCardBody>
            </MDBCard>
            </Col>
        );
    }

    render() {
        return(
            <div id="SendEmbed">
                <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <ToastContainer position="top-right" autoClose={5000} newestOnTop rtl={false} />
                <Row>
                    {this.state.dataReceived ? this.renderForm() : <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                    <Col>
                        <Container>
                        <MDBCard className="w-25" style={{ position: "fixed" }}>
                        <MDBCardBody style={{ background: "#1a1a1a", minHeight: "100px" }}>
                            <Row style={{ marginBottom: "2%" }}>
                            <Col>
                                <label>Embed Preview</label>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                                <EmbedPreview embedData={{
                                    color: this.state.color ? this.state.color : '#3f4346',
                                    title: this.state.title ? this.state.title : '',
                                    description: this.state.description ? this.state.description : '',
                                    thumbnail: this.state.thumbnail ? this.state.thumbnail : '',
                                    author: {
                                        name: this.state.author_name ? this.state.author_name : '',
                                        icon: this.state.author_icon ? this.state.author_icon : ''
                                    },
                                    fields: this.state.fields,
                                    footer: {
                                        name: this.state.footer_name ? this.state.footer_name : '',
                                        icon: this.state.footer_icon ? this.state.footer_icon : ''
                                    }
                                }} />
                            </Col>
                            </Row>
                        </MDBCardBody>
                        </MDBCard>
                        </Container>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
};

export default SendEmbed;