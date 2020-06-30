import React from 'react';
import {Provider} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './App.css';
import Header from "./components/header/header";
import Home from "./components/home/home";
import store from "./redux/store";

function App() {
  return (
  <Provider store={store}>
    <Router>
        <Header> </Header>
        <Switch>
            <Route path='/'>
                <Home />
            </Route>
        </Switch>
    </Router>
  </Provider>
  );
}

export default App;
