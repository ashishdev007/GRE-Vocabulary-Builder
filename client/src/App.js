import React from 'react';
import './css/App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import AddWord from './components/words/AddWord';
import Practice from './components/practice/Practice.jsx';
import history from './history';
import Landing from './components/Landing';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <NavBar />
        <Route exact path="/add-word" component={AddWord} />
        <Route path="/practice" component={Practice} />
        <Route exact path="/" component={Landing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
