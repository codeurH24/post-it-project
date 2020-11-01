// official components 
import React from "react";
import { Redirect } from "react-router-dom";
  

  
export default class Logout extends React.Component {
    
    constructor(props) {
      super(props)
       // const auth = new Auth();
      console.log('Logout constructor')
      this.props.isConnectedUpdate(false);
    }
   
    render() {
      return (
        <Redirect to='/' />
      );
    }
}
  
 