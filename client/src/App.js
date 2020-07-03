import React from 'react';
import './css/App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import AddWord from './components/words/AddWord';
import Practice from './components/practice/Practice.jsx';
import history from './history';

function App() {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <Route exact path="/add-word" component={AddWord} />
        <Route path="/practice" component={Practice} />
      </div>
    </BrowserRouter>
  );
}

export default App;
