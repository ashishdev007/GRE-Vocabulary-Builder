import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './css/App.module.css';

import AddWord from './components/words/AddWord';
import Practice from './components/practice/Practice.jsx';
import history from './history';

function App() {
  history.push('/practice/start-session');
  return (
    <BrowserRouter history={history}>
      <div className={styles.App}>
        <Route exact path="/add-word" component={AddWord} />
        <Route path="/practice" component={Practice} />
      </div>
    </BrowserRouter>
  );
}

export default App;
