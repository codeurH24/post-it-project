import React from 'react'
import { 
    Button, Form, Container, Col, Row
} from 'react-bootstrap'

import {Popup} from "../Modal/Popup"

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
        console.log('Create project submited')
        console.log('Create project submited')

        const formData = new FormData();
        formData.append('title', "string");
        // formData.append('updatedAt', "string");
        formData.append('published', true);
        formData.append('description', "string");
        // formData.append('user', "string");
        // formData.append('createdAt', "2020-11-03T22:59:46.952Z");

        const url = `http://localhost:8888/api/projects`;
        const header = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
            },
            body: JSON.stringify({
                "title": this.state.title,
                "published": true,
                "description": this.state.description
            })
        }

        console.log('fetch', url, header);

        fetch(url,header)
        .then(resp => {
            console.log('resp', resp)
            if(resp.ok) {
                resp.json().then(json => {
                    console.log('json', json);
                    this.setState({
                        isCreated: true
                    })
                })
            } else {
                if(resp.status === 401) {
                    console.log('Non autorisé');
                }
            }
        })
        .catch(error => {
            console.error('SERVER IS DOWN');
            console.error(error);
        })
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

    ProjectFilterTest = () => {
        console.log('click ProjectFilterTest')

        const url = `http://localhost:8888/api/projects?user=14`;
        const header = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
            }
        }

        console.log('fetch', url, header);

        fetch(url,header)
        .then(resp => {
            console.log('resp', resp)
            if(resp.ok) {
                resp.json().then(json => {
                    console.log('json', json);
                    
                })
            } else {
                if(resp.status === 401) {
                    console.log('Non autorisé');
                }
            }
        })
        .catch(error => {
            console.error('SERVER IS DOWN');
            console.error(error);
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
                                    <button onClick={this.ProjectFilterTest}>TEST</button>
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