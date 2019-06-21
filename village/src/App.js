import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import SmurfUpdate from './components/SmurfUpdate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  updateSmurf = (id, newSmurf) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, newSmurf)
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log(newSmurf);
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    console.log(this.state.smurfs);
    return (
      <div className="App">
        <nav>
          <div className="nav-links">
            <NavLink exact to="/smurf-form">
              <h2>Form for creating a new smurf</h2>
            </NavLink>
            <NavLink exact to="/">
              <h2>Smurf village</h2>
            </NavLink>
            <NavLink exact to="/smurf-form">
              <h2>Form for updating the smurf</h2>
            </NavLink>
          </div>
        </nav>
        <Route
          path="/smurf-form"
          render={props => {
            return <SmurfForm {...props} />;
          }}
        />

        <Route
          exact
          path="/"
          render={props => {
            return (
              <Smurfs
                {...props}
                smurfs={this.state.smurfs}
                deleteSmurf={this.deleteSmurf}
              />
            );
          }}
        />

        <Route
          path="/:id"
          render={props => {
            return (
              <SmurfUpdate
                updateSmurf={this.updateSmurf}
                {...props}
                smurfs={this.state.smurfs}
                // oneSmurf={this.state.smurfs.find(smurf => {
                //   console.log(this)
                //   return smurf.id
                // })}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
