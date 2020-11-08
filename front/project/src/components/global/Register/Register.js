// official components 
import React from 'react'
import { 
    Button, Form, Container, Col, Row
} from 'react-bootstrap'

import {Popup} from "../Modal/Popup"
import * as person from '../../../services/api-rest/Person'

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
            pseudo:null,
            password:null,
            isConnected: false
      }

    }

    submitedRegister = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('register submited');

        //   const url = `http://localhost:8888/api/persons`;
        //   const header = {
        //       method: 'POST',
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify({
        //         "pseudo": this.state.pseudo,
        //         "birthdayAt": "2020-11-07T07:03:17.501Z",
        //         "email": this.state.username,
        //         "password": this.state.password
        //       })
        //   }

        //   console.log('fetch', url, header);

        //   fetch(url,header)
        //   .then(resp => {
        //       console.log('resp', resp)
        //       if(resp.ok) {
        //           resp.json().then(json => {
        //               console.log('json', json);
        //               this.setState({
        //                 isConnected: true
        //               })
        //           })
        //       } else {
        //           if(resp.status === 401) {
        //               console.log('Non autorisé');
        //           }
        //       }
        //   })
        //   .catch(error => {
        //       console.error('SERVER IS DOWN');
        //       console.error(error);
        //   })

        const resp = await person.create({
            body: JSON.stringify({
                "pseudo": this.state.pseudo,
                "birthdayAt": "2020-11-07T07:03:17.501Z",
                "email": this.state.username,
                "password": this.state.password
            })
        })

        if(resp.ok) {
            resp.json().then(json => {
                console.log('json', json);
                this.setState({
                    isConnected: true
                })
            })
        }

    }

    onChangeEmail = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const value = e.currentTarget.value;
        console.log('email', value)
        this.setState({
            username: value
        });
    }
    onChangePseudo = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const value = e.currentTarget.value;
        console.log('pseudo', value)
        this.setState({
            pseudo: value
        });
    }

    onChangePassword = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const value = e.currentTarget.value;
        console.log('password', value)
        this.setState({
            password: value
        });
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
                              Vous pouvez maintenant vous connecter
                          </p>
                      )
                  }} />    
              }
          </div>
      )
  }
}
  
 