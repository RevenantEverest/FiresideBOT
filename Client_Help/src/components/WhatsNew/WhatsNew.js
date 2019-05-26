import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './WhatsNew.css';

class WhatsNew extends Component {

    render() {
        return(
            <div id="WhatsNew">
                <div className="WhatsNew-Contents">
                    <h1>What's New?</h1>

                    {/* Updateable */}
                    <div className="WhatsNew-MainContent">
                        <h2>v1.2.0</h2>
                        
                        <br />

                        <h3>News</h3>
                        <ul className="WhatsNew-News-UL">
                            <li>Fireside Help Docs has moved over to its own domain at <p>help.firesidebot.com</p></li>
                            <li>Main site and sub sites now using SSL</li>
                            <li>Volume Commands now defaults to <p>50</p> instead of <p>100</p></li>
                        </ul>

                        <br />

                        <h3>New Commands</h3>
                        <ul className="WhatsNew-NewCommands-UL">
                            <Link to="/commands/createplaylist"><li>CreatePlaylist</li></Link>
                            <Link to="/commands/deleteplaylist"><li>DeletePlaylist</li></Link>
                            <Link to="/commands/addsong"><li>AddSong</li></Link>
                            <Link to="/commands/removesong"><li>RemoveSong</li></Link>
                            <Link to="/commands/lyrics"><li>Lyrics</li></Link>
                            <Link to="/commands/musicoptions"><li>MusicOptions</li></Link>
                            <Link to="/commands/autoplay"><li>Autoplay</li></Link>
                            <Link to="/commands/loop"><li>Loop</li></Link>
                            <Link to="/commands/weather"><li>Weather</li></Link>
                            <Link to="/commands/songinfo"><li>SongInfo</li></Link>
                        </ul>

                        <br />

                        <h3>Changed Commands</h3>
                        <ul className="WhatsNew-ChangedCommands-UL">
                            <Link to="/commands/playlist"><li>Playlist</li></Link>
                        </ul>

                        <br />

                        <div className="WhatsNew-Trello">
                            <h3>View The Full Changelog on Trello</h3>
                            <blockquote className="trello-card-compact">
                                <a href="https://trello.com/c/g83TzeDV/3-v120">Trello Card</a>
                            </blockquote>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default WhatsNew;