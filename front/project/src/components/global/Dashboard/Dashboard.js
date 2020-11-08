import React from 'react'
import { 
    Table, Container, Col, Row
} from 'react-bootstrap'
import {
    Redirect
} from "react-router-dom";

import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import * as project from '../../../services/api-rest/Project';

// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';


export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projets: null,
            redirectTo: null
        }

        
    }

    UNSAFE_componentWillMount() {
        this.listProject();
    }

    listProject = async () => {
        const resp = await project.list();

        if(resp.ok) {
            resp.json().then(json => {
                console.log('json', json);
                this.setState({
                    projets: json
                })
            })
        }
    }

    onRemoveProject = async (id) => {

        if (window.confirm("désirez Vous supprimer ?")) {
            console.log("onRemoveProject id:", id);
            const resp = await project.remove({id});
            if(resp.ok) {
                if (resp.status === 204) {
                    console.log('project #'+id+' vient d\'etre supprimer.');
                    this.listProject();
                } else {
                    console.log('project #'+id+' erreur de suppression.');
                }
            }
        }
        
        
        
    }

    date = (elm) => {
        return (new Date(elm.createdAt).toLocaleDateString())
    }

    actionTrash = () => {
        console.log('action trash')
    }

    renderRedirect = () => {
        if (this.state.redirectTo) {
          return <Redirect to={this.state.redirectTo} />
        }
    }

    onUpdateProject = (id) => {
        console.log('onUpdateProject', id)
    }

    
    render() {
        return (
            <div className="" id="dashboard-page">
                {this.renderRedirect()}
                <Container>
                    <Row>
                        <Col>
                            <h1 style={{marginBottom:'2rem'}}>Tableau de bord</h1>
                            
                            <h2>Liste des projets</h2>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Titre</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.projets && this.state.projets.map((elm,key)=> (
                                            <tr key={key}>
                                                <td>{this.date(elm)}</td>
                                                <td>{elm.title}</td>
                                                <td style={{textAlign:'right'}}>
                                                    <BiEdit style={{fontSize:'1.6rem', color:'#57d376'}} onClick={() => {this.onUpdateProject(elm.id)}} />
                                                    <BsFillTrashFill onClick={this.actionTrash} style={{fontSize:'1.2rem', color:'#ff6e6e'}} onClick={() => {this.onRemoveProject(elm.id)}} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }
}