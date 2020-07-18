import React from 'react';
import { AuthFormLogic } from './Auth';
import { Login as LoginApi } from '../../apis/authentication';
import { useContext } from 'react';
import { AuthContext } from '../../App';

const Login = () => {
  const FormLogic = AuthFormLogic({
    email: '',
    password: '',
    submitted: false,
  });
  const LoginState = FormLogic.state;
  const setLoginState = FormLogic.setState;
  const handleInputChange = FormLogic.handleInputChange;

  const { state, dispatch } = useContext(AuthContext);

  const onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = LoginState;

    setLoginState({
      email: '',
      password: '',
      submitted: true,
    });

    LoginApi(email, password, dispatch);
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
            value={LoginState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={LoginState.password}
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
