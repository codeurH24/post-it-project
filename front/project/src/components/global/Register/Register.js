// official components 
import React from 'react'
import { 
    Button, Form, Container, Col, Row
} from 'react-bootstrap'

import {Popup} from "../Modal/Popup"

// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';

  
export default class Register extends React.Component {
    
    constructor(props) {
      super(props)
       // const auth = new Auth();
      console.log('Logout constructor')
      this.props.isConnectedUpdate(false);

      this.state = {
          username:null,
          password:null,
          isConnected: false
      }

    }

    submitedRegister = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('register submited')
    }
   
    render() {
      return (
          <div className="" id="connexion-page">
              {!this.state.isConnected ?
                  <div className="container-form">
                      
                      <Container>
                          <Row className="justify-content-md-center" >
                              <Col xs="5">
                                  
                                  <Form onSubmit={this.submitedRegister}>
                                      <h1>Inscription</h1>
                                      <Form.Group controlId="formBasicEmail">
                                          <Form.Label>Adresse e-mail</Form.Label>
                                          <Form.Control type="email" placeholder="Entrer un email" onChange={this.onChangeEmail} />
                                          {/* <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                          </Form.Text> */}
                                      </Form.Group>

                                      <Form.Group controlId="formBasicEmail">
                                          <Form.Label>Pseudonyme</Form.Label>
                                          <Form.Control type="text" placeholder="Entrer un pseudo" onChange={this.onChangePseudo} />
                                          {/* <Form.Text className="text-muted">
                                          We'll never share your email with anyone else.
                                          </Form.Text> */}
                                      </Form.Group>

                                      <Form.Group controlId="formBasicPassword">
                                          <Form.Label>Mot de passe</Form.Label>
                                          <Form.Control type="password" placeholder="" onChange={this.onChangePassword} />
                                      </Form.Group>

                                      <Form.Group controlId="formBasicPassword">
                                          <Form.Label>Confirmer le mot de passe</Form.Label>
                                          <Form.Control type="password" placeholder="" onChange={this.onChangePassword} />
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
  
 