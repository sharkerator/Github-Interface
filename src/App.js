import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'normalize.css';
import './styles/style.scss';
import "babel-polyfill";

import Search from './components/Search';
import Issues from './components/Issues';
import Issue from './components/Issue';

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Search/>
            <Route path="/search" component={Issues} />
            <Route path="/detail" component={Issue} />
          </div>
        </Router>
      </div>
    )
  }
}