import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import Header from './components/header/header';
import Home from './components/home/home';
import store from './redux/store';
import DataLoader from './components/dataLoader';
import Confirmation from './components/confirmation/confirmation';
import Registered from './components/registered/registered';

function App () {
  return (
    <Provider store={store}>
      <DataLoader />
      <Router>
        <Header />
        <Switch>
          <Route path='/confirmation/:code' component={Confirmation} />
          <Route path='/registered' component={Registered} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
