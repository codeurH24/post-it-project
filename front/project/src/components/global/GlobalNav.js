import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

import IMG_POST_IT_PROJECT_LOGO  from '../../static/image/site/post-it-project.png'

export class GlobalNav extends React.Component {
    
    render(props) {
        console.log('GlobalNav props', this.props)
        return (
            <Navbar bg="dark">
                <Link className="navbar-brand" to="/">
                    <img id="IMG_POST_IT_PROJECT_LOGO" src={IMG_POST_IT_PROJECT_LOGO} alt=""/>
                    Post It Project
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li> */}
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
                                <Link className="nav-link" to="/logout">Déconnexion</Link>
                                :
                                <Link className="nav-link" to="/connexion">Connexion</Link>
                            }
                        </li> 
                        <li className="nav-item active">
                            {!this.props.isConnected() && <Link className="nav-link" to="/inscription">Inscription</Link>}
                        </li> 
                    </ul>
                    {/* <span className="navbar-text">
                    Navbar text with an inline element
                    </span> */}
                </div>
            </Navbar>
        )
    }
}