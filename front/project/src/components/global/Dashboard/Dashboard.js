import React from 'react'
import { 
    Table, Container, Col, Row
} from 'react-bootstrap'

import { BsFillTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';


export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projets: null
        }
    }

    componentWillMount() {
        fetch(`http://localhost:8888/api/projects`,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('user')).token
            }
        })
        .then(resp => {
            console.log('resp', resp)
            if(resp.ok) {
                resp.json().then(json => {
                    console.log('json', json);
                    this.setState({
                        projets: json
                    })
                })
            } else {
                if(resp.status === 401) {
                    console.log('401 Error');
                }
            }
        })
        .catch(error => {
            console.error('SERVER IS DOWN');
            console.error(error);
        })
    }

    date = (elm) => {
        return (new Date(elm.createdAt).toLocaleDateString())
    }

    actionTrash = () => {
        console.log('action trash')
    }

    
    render() {
        return (
            <div className="" id="dashboard-page">
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
                                                <td>
                                                    <BiEdit style={{fontSize:'1.6rem', color:'#57d376'}} />
                                                    <BsFillTrashFill onClick={this.actionTrash} style={{fontSize:'1.2rem', color:'#ff6e6e'}} />
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