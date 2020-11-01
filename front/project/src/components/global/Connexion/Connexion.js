import React from 'react'
import { 
    Button, Form, Container, Col, Row
} from 'react-bootstrap'

import {Popup} from "../Modal/Popup"

// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';
import './connexion.css'


export class Connexion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null,
            password:null,
            isConnected: false
        }
    }


    submitedConnexion = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('submitedConnexion:  ', this.state);
        
        fetch(`http://localhost:8888/api/login_check`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        .then(resp => {
            console.log('resp', resp)
            if(resp.ok) {
                resp.json().then(json => {
                    console.log('json', json)
                    localStorage.setItem('user', JSON.stringify({
                        token: json.token
                    }));
                    this.props.isConnectedUpdate(true);
                    this.setState({
                        isConnected: true
                    })
                })
            } else {
                if(resp.status === 401) {
                    console.log('Les identifiants sont incorrectes')
                }
            }
        })
        .catch(error => {
            console.error('SERVER IS DOWN');
            console.error(error);
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            username: e.currentTarget.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.currentTarget.value
        })
    }

    render() {
        return (
            <div className="" id="connexion-page">
                {!this.state.isConnected ?
                    <div className="container-form">
                        
                        <Container>
                            <Row className="justify-content-md-center" >
                                <Col xs="5">
                                    <Form onSubmit={this.submitedConnexion}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Adresse e-mail</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
                                            {/* <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                            </Form.Text> */}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Mot de passe</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} />
                                        </Form.Group>
                                        {/* <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group> */}
                                        <div style={{textAlign:'center'}}>
                                            <Button variant="primary" type="submit">
                                                Connexion
                                            </Button>
                                        </div>
                                    </Form>
                                {/* test */}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    :
                    <Popup title={() => "Information"} content={() => {
                        return (
                            <p>
                                Vous etes maintenant connecté
                            </p>
                        )
                    }} />    
                }
            </div>
        )
    }
}