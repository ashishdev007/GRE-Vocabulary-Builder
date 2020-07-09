import React, { useReducer, useMemo, useEffect } from 'react';
import './css/App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import AddWord from './components/words/AddWord';
import Practice from './components/practice/Practice.jsx';
import history from './history';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import ProfilePage from './components/profile/ProfilePage';
import { initialState, authReducer } from './reducers/authReducer';
import LoaderModal from './modals/LoaderModal';
import { getUserFromToken } from './apis/authentication';
import Auth from './components/profile/Auth';

export const AuthContext = React.createContext(initialState);

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    getUserFromToken(state.token, dispatch);
  }, []);

  const normalApp = () => {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/add-word" component={AddWord} />
        <Route path="/practice" component={Practice} />
        <Route path="/profile" component={ProfilePage} />
        <Route exact path="/" component={Landing} />
      </div>
    );
  };

  return (
    <BrowserRouter history={history}>
      <AuthContext.Provider value={contextValue}>
        {state.isLoading ? (
          <LoaderModal />
        ) : state.isValidated ? (
          normalApp()
        ) : (
          <Auth />
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
