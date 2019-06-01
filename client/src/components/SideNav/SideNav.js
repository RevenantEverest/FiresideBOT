import React, { Component } from 'react';
import './SideNav.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'react-bulma-components';
import { Dropdown } from 'react-bootstrap';

//Image Imports
import Logo from '../../res/images/Logo.png';

class SideNav extends Component {

    render() {
        return(
            <div id="SideNav">
                 <Menu>
                    <Menu.List>
                    <Menu.List.Item>
                        <div id="SideNav-Logo-Container">
                            <img id="SideNav-Logo" src={Logo} alt="" />
                            <h4 id="SideNav-LogoText">FiresideBOT</h4>
                        </div>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/dashboard">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="tachometer-alt" />
                            Dashboard
                        </Link>
                    </Menu.List.Item>
                    <Menu.List.Item className="SideNav-Element">
                    <Dropdown className="SideNav-Dropdown">
                    <Dropdown.Toggle as="p" id="dropdown-basic" className="SideNav-Dropdown-Toggle">
                        <FontAwesomeIcon className="FontAwesomeIcon SideNav-Dropdown-Icon" icon="magic" />
                        Commands
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="SideNav-Dropdown-Menu">
                        <Link to="/commands/default">
                            <Dropdown.Item as="p" className="SideNav-Dropdown-Item SideNav-Dropdown-Item-Commands">
                                Default Commands
                            </Dropdown.Item>
                        </Link>
                        <Link to="/commands/custom">
                            <Dropdown.Item as="p" className="SideNav-Dropdown-Item SideNav-Dropdown-Item-Commands">
                                Custom Commands
                            </Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/analytics">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="chart-line" />
                            Analytics
                        </Link>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/ranks">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="award" />
                            Ranks
                        </Link>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                    <Dropdown className="SideNav-Dropdown">
                    <Dropdown.Toggle as="p" id="dropdown-basic" className="SideNav-Dropdown-Toggle">
                        <FontAwesomeIcon className="FontAwesomeIcon SideNav-Dropdown-Icon" icon="music" />
                        Music
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="SideNav-Dropdown-Menu">
                        <Link to="/autodj">
                            <Dropdown.Item as="p" className="SideNav-Dropdown-Item">
                                AutoDJ
                            </Dropdown.Item>
                        </Link>
                        <Link to="/playlists">
                            <Dropdown.Item as="p" className="SideNav-Dropdown-Item">
                                Playlists
                            </Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/economy">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="coins" />
                            Economy
                        </Link>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/moderation">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="bolt" />
                            Moderation
                        </Link>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/trackers">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="crosshairs" />
                            Trackers
                        </Link>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <a className="SideNav-Element-Content" target="_blank" rel="noopener noreferrer" href="https://help.firesidebot.com">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="info-circle" />
                            Help
                        </a>
                    </Menu.List.Item>

                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/support">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="comments" />
                            Support
                        </Link>
                    </Menu.List.Item>
                    
                    <Menu.List.Item className="SideNav-Element">
                        <Link className="SideNav-Element-Content" to="/settings">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon="cogs" />
                            Settings
                        </Link>
                    </Menu.List.Item>
                    </Menu.List>
                </Menu>
            </div>
        );
    }
};

export default SideNav;