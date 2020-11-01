import React, { Fragment } from 'react'

export default class JoinProject extends React.Component {

    render() {
        console.log('JoinProject this.props', this.props    )
        return (
            <Fragment>
                <p>{'Rejoindre un projet'}</p>
                {this.props.isConnected() ? 'Est connecté' : 'Pas connecté'}
                {/* {localStorage.getItem('user') ? 'Est connecté' : 'Pas connecté'} */}
            </Fragment>
        )
    }
}