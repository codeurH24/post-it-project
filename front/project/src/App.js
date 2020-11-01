// official components 
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// homemade components 
import {GlobalNav} from './components/global/GlobalNav'
import {Footer} from './components/global/Footer'
import {Connexion} from './components/global/Connexion/Connexion'
import Logout from './components/global/Logout/Logout'
import JoinProject from './components/global/JoinProject'

// services
import {Auth} from './services/Auth'


// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';

// statics files (homemade)
import './static/css/global.css';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('App constructor')

    const auth = new Auth();

    this.state = {
      isConnected:  auth.isConnected()
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('App getDerivedStateFromProps', props, state)
  //   return {favoritecolor: props.favcol };
  // }
  // componentDidMount() {
  //   console.log('App componentDidMount');
  // }
  // getSnapshotBeforeUpdate() {
  //   console.log('App getSnapshotBeforeUpdate()');
  // }
  // componentDidUpdate() {
  //   console.log('App componentDidUpdate()');
  // }

  // shouldComponentUpdate() {
  //   console.log('App shouldComponentUpdate()');
  //   // return false;
  // }

  isConnectedUpdate = (value) => {

    if(value === false) localStorage.removeItem('user');

    this.setState({
      isConnected: value
    }, () => {
      console.log('isConnectedUpdate setState', this.state)
    })
  }

  logout = () => {
    localStorage.removeItem('user');
    if(this.state.isConnected) this.isConnectedUpdate(false);
    return <Redirect to='/' />
  }

  render() {
    console.log('App render')
    return (
      <Router>
        <GlobalNav isConnected={()=>this.state.isConnected} />
        <div className="page-content">
          <Switch>
            <Route path="/rejoindre-un-projet">
              <JoinProject isConnected={()=>this.state.isConnected} />
            </Route>
            <Route path="/publier-mon-project">
              <p>{'Publier mon project'}</p>
            </Route>
            <Route path="/je-suis-disponible">
              <p>{'Je suis disponible'}</p>
            </Route>
            <Route path="/connexion">
              <p>{'Connexion'}</p>
              <Connexion isConnectedUpdate={this.isConnectedUpdate} />
            </Route>
            <Route path="/logout">
              {/* {this.logout()} */}
              <Logout isConnectedUpdate={this.isConnectedUpdate} />  
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}


