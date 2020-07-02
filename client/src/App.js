import React from 'react';
import styles from './css/App.module.css';

import AddWord from './components/words/AddWord';

function App() {
  return (
    <div className={styles.App}>
      <AddWord />
    </div>
  );
}

export default App;
