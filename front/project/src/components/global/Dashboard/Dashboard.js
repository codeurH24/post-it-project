import React from 'react'
import { 
    Table, Container, Col, Row
} from 'react-bootstrap'


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

    
    render() {
        return (
            <div className="" id="dashboard-page">
                <Container>
                    <Row>
                        <Col>
                            <h1>Dashboard</h1>

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
                                                <td>{elm.createdAt}</td>
                                                <td>{elm.title}</td>
                                                <td></td>
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