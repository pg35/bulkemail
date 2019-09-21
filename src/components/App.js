import React from "react";
import {MemoryRouter as Router} from 'react-router';
import {Route} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:{
        postcode:'',
        subject: '',
        message:''
      }
    };
  }
  handleLastEmail()
  render(){
    return(
      <Router>
        <Route path="/" exact render={() => <Home setEmail={this.setEmail}/>}/>
      </Router>
    )
  }
  
}
export default App;
