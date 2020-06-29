import React from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Header from "./components/header/header";
import Home from "./components/home/home";

function App() {
  return (
    <Router>
        <Header> </Header>
        <Switch>
            <Route path='/'>
                <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
