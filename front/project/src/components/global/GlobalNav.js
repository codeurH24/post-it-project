import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";

import IMG_POST_IT_PROJECT_LOGO  from '../../static/image/site/post-it-project.png'
import '../../static/css/menu.css'

export class GlobalNav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenMenuTools: false
        }
    }

    openMenuTools = () => {
        let isOpenMenuTools = this.state.isOpenMenuTools;

        this.setState({
            isOpenMenuTools: !isOpenMenuTools
        })
    }
    
    render(props) {
        
        return (
            <>
            <Container className="bg1 fg1" id="newMenu" fluid>

                <Row id="logo-bar">
                    <Col>
                        <Container>
                        <Row>
                            <Col>
                                <Link to="/">
                                    <img id="IMG_POST_IT_PROJECT_LOGO" src={IMG_POST_IT_PROJECT_LOGO} alt=""/>
                                    Post It Project
                                </Link>
                            </Col>
                            <Col id="tools-menu">
                                <button onClick={this.openMenuTools} id="open-menu">
                                    <ImMenu />
                                </button>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="justify-content-xl-center">
                    <Col lg={12} xl={12} >
                        <ul className={this.state.isOpenMenuTools ? 'open' : ''}>
                            <li className="nav-item active">
                                {<Link className="nav-link" to="/">Accueil</Link>}
                            </li> 
                            <li className="nav-item active">
                                {<Link className="nav-link" to="/rejoindre-un-projet">Rejoindre un projet</Link>}
                            </li> 
                            <li className="nav-item active">
                                {<Link className="nav-link" to="/publier-mon-project">Publier mon project</Link>}
                            </li> 
                            <li className="nav-item active">
                                {<Link className="nav-link" to="/je-suis-disponible">Je suis disponible</Link>}
                            </li>
                            <li className="nav-item active">
                                {this.props.isConnected() ? 
                                    <Link className="nav-link" to="/tableau-de-bord">Tableau de bord</Link>
                                    :
                                    ''
                                }
                            </li>
                            <li className="nav-item active">
                                {this.props.isConnected() ? 
                                    <Link className="nav-link" to="/logout">Déconnexion</Link>
                                    :
                                    <Link className="nav-link" to="/connexion">Connexion</Link>
                                }
                            </li> 
                            <li className="nav-item active">
                                {!this.props.isConnected() && <Link className="nav-link" to="/inscription">Inscription</Link>}
                            </li> 
                        </ul>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}