import React from 'react'
import { Navbar } from 'react-bootstrap';
import IMG_POST_IT_PROJECT_LOGO  from '../../static/image/site/post-it-project.png'

export class Footer extends React.Component {

    render() {
        return (
            <footer>
                <Navbar bg="dark">
                    <Navbar.Brand href="#home">
                    <img id="IMG_POST_IT_PROJECT_LOGO" src={IMG_POST_IT_PROJECT_LOGO} alt=""/>
                    </Navbar.Brand>
                </Navbar>
            </footer>
        )
    }
}