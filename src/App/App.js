import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';

import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <h1 className="main-header">Sports Roster</h1>
        { (!authed) ? (<Auth />) : (<div>You logged in!</div>) }
      </div>
    );
  }
}

export default App;
