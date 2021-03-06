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
import {Dashboard} from './components/global/Dashboard/Dashboard'
import Logout from './components/global/Logout/Logout'
import Register from './components/global/Register/Register'
import JoinProject from './components/global/JoinProject'
import CreateProject from './components/global/Project/CreateProject'

// services
import {Auth} from './services/Auth'


// statics files (official)
import 'bootstrap/dist/css/bootstrap.min.css';

// statics files (homemade)
import './static/css/global.css';
import './static/css/basic-theme.css';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('App constructor')

    const auth = new Auth();

    this.state = {
      isConnected:  auth.isConnected()
    }
  }
  

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
    
    return (
      <Router>
        <GlobalNav isConnected={()=>this.state.isConnected} />
        
        <div className="page-content">
          <Switch>
            <Route path="/rejoindre-un-projet">
              <JoinProject isConnected={()=>this.state.isConnected} />
            </Route>
            <Route path="/publier-mon-project">
              <CreateProject isConnected={()=>this.state.isConnected} />
            </Route>
            <Route path="/je-suis-disponible">
              <p>{'Je suis disponible'}</p>
            </Route>
            <Route path="/connexion">
              <Connexion isConnectedUpdate={this.isConnectedUpdate} />
            </Route>
            <Route path="/logout">
              {/* {this.logout()} */}
              <Logout isConnectedUpdate={this.isConnectedUpdate} />  
            </Route>
            <Route path="/inscription">
              {/* {this.logout()} */}
              <Register isConnectedUpdate={this.isConnectedUpdate} />  
            </Route>
            <Route path="/tableau-de-bord">
              <Dashboard isConnected={()=>this.state.isConnected} />  
            </Route>
            <Route path="/" exact={true}>
              {
                process.env.NODE_ENV === 'development' ?
                  <h1>home DEV</h1>
                  :
                  <h1>Accueil</h1>
              }  
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}


