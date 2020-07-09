import React from 'react';
import { AuthFormLogic } from './Auth';

const Login = () => {
  const { state, setState, handleInputChange } = AuthFormLogic({
    email: '',
    password: '',
    submitted: false,
  });

  const onSubmit = (event) => {
    event.preventDefault();

    // const { email, password, fname, lname } = state;

    setState({
      email: '',
      password: '',
      submitted: true,
    });
  };

  return (
    <div className="Login">
      <h1 className="ui header">Login</h1>
      <form className="ui big form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <div
          className="ui large blue button"
          id="LoginButton"
          onClick={onSubmit}
        >
          Login
        </div>
      </form>
    </div>
  );
};

export default Login;
