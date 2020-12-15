import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import ProfilePage from '../ProfilePage/ProfilePage'
import HomePage from '../HomePage/HomePage'

class App extends Component {

  render() {
    return (
      <>
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>

        <Switch>
          <Route exact path='/' render={() => <><HomePage /> </>} />
          <Route exact path='/profile' render={() => <ProfilePage />} />
        </Switch>

        <footer>
          &nbsp;
          <h5>App coded in <span>React</span> by <span>Tech Monarchs</span> </h5>
        </footer>

      </>
    );
  }
}

export default App;


