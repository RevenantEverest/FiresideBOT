import React, { Component } from 'react';
import './EmbedPreview.css';

import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

class EmbedPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderAuthor(embed) {
        return(
            <div id="author">
                {embed.author.icon ? <img id="author-icon" src={embed.author.icon} alt="" /> : ''}
                {embed.author.name ? <Link to="#" id="author-name">{embed.author.name}</Link> : ''}
            </div>
        );
    }

    renderFooter(embed) {
        return(
            <div id="footer">
                {embed.footer.icon ? <img id="footer-icon" src={embed.footer.icon} alt="" /> : ''}
                {embed.footer.name ? <Link to="#" id="footer-name">{embed.footer.name}</Link> : ''}
            </div>
        );
    }

    renderFields(embed) {
        let Fields = embed.fields.map((el, idx) => {
            return(
                <div className={`field ${el.inline ? "inline" : ''}`} key={idx}>
                    <div className="field-name">{el.text}</div>
                    <div className="field-value">{el.value}</div>
                </div>
            );
        });

        return(
            <div id="fields">
            {Fields}
            </div>
        );
    }

    render() {
        const embed = this.props.embedData;
        return(
            <div id="EmbedPreview" className="block">
            <div id="wrapper">
                <div id="side-color" style={{ background: embed.color }} />
                <div id="card">
                    <div className="block">
                        <div id="inner">
                            {embed.author ? this.renderAuthor(embed) : ''}
                            {embed.title ? <div id="title">{embed.title ? embed.title : "undefined"}</div> : ''}
                            {embed.description ? <div id="description"><ReactMarkdown source={embed.description ? embed.description : "undefined"} /></div> : ''}
                            {embed.fields ? this.renderFields(embed) : ''}
                        </div>
                        {embed.thumbnail ? <img id="thumb" src={embed.thumbnail} alt="" /> : ''}
                    </div>
                    {embed.footer ? this.renderFooter(embed) : ''}
                </div>
            </div>
            </div>
        );
    }
};

export default EmbedPreview;