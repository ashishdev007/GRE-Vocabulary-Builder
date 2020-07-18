import React, { useContext, useEffect, useState } from 'react';
import '../../css/Auth.css';
import { AuthContext } from '../../App';
import { checkFirstTimeUser } from '../../apis/authentication';
import SignUp from './SignUp';
import Login from './LogIn';

export const AuthFormLogic = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let tempState = { ...state };
    tempState[name] = value;

    setState({ ...tempState });
  };

  return { state, setState, handleInputChange };
};

const Auth = () => {
  const { state, dispatch } = useContext(AuthContext);

  // useEffect(async () => {
  //   await checkFirstTimeUser();
  // }, []);

  return <>{!state.firstTime ? <SignUp /> : <Login />}</>;
};

export default Auth;
