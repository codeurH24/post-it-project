import React from 'react'
import { 
    Button, Modal
} from 'react-bootstrap'

// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';

export class Popup extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>
                    { this.props.title ?
                        this.props.title()
                        :
                        'Modal title'
                    }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    { this.props.content ?
                        this.props.content()
                        :
                        <p>Modal body text goes here.</p>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}