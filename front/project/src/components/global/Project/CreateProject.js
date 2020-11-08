import React from 'react'
import { 
    Button, Form, Container, Col, Row
} from 'react-bootstrap'

import {Popup} from "../Modal/Popup"

import * as project from '../../../services/api-rest/Project';

export default class CreateProject extends React.Component {

    constructor() {
        super()
        this.state = {
            isCreated: false,
            title: null,
            description: null
        }

    }

    submitedForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Create project submited');
        
        (async () => {
            const resp = await project.create({
                body:JSON.stringify({
                    "title": this.state.title,
                    "published": true,
                    "description": this.state.description
                })
            })
    
            console.log('resp', resp)
            if(resp.ok) {
                resp.json().then(json => {
                    console.log('json', json);
                    this.setState({
                        isCreated: true
                    })
                })
            }
        })()
    }

    onChangeTitle = (e) => {
        e.preventDefault();
        e.stopPropagation();


        this.setState({
            title: e.currentTarget.value
        })

    }

    onChangeDescription = (e) => {
        e.preventDefault();
        e.stopPropagation();


        this.setState({
            description: e.currentTarget.value
        })

    }
    

    render() {

        return (
            <div className="" id="connexion-create-project">
                {!this.state.isCreated ?
                    <div className="container-form">
                      
                        <Container>
                            <Row className="justify-content-md-center" >
                                <Col xs="12">
                                    <Form onSubmit={this.submitedForm}>
                                        <h1>Publier mon project</h1>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Titre</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un titre" onChange={this.onChangeTitle} />
                                        </Form.Group>
                                        
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description du projet</Form.Label>
                                            <Form.Control as="textarea" rows={3} onChange={this.onChangeDescription}  />
                                        </Form.Group>

                                        <div style={{textAlign:'center'}}>
                                            <Button variant="primary" type="submit">
                                                Publier
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    :
                    <Popup title={() => "Information"} content={() => {
                        return (
                            <p>
                                Projet publier avec succès
                            </p>
                        )
                    }} />    
                }
            </div>
        )
    }
}