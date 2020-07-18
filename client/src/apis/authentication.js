import { backendURL } from './backend';
import { actionTypes } from '../reducers/authReducer';

export const getUserFromToken = (token, dispatch) => {
  // (If session valid) Set:
  // isLoading: false,
  // validated: true,
  // image: ...
  // useID: ...
  // (If session invalid) Set:
  // isLoading: false,
  // validated: true,
  // image: ...
  // useID: ...
};

export const checkFirstTimeUser = () => {};

export const Login = (email, password, dispatch) => {
  dispatch({ type: actionTypes.loadingUser });

  fetch(`${backendURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      let response = await res.json();
      if (res.ok) {
        return response;
      } else {
        throw response;
      }
    })
    .then((data) => {
      dispatch({
        type: actionTypes.userLoaded,
        payload: { isValidated: true, token: data.tkn },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SingUp = (name, email, password, dispatch) => {
  dispatch({ type: actionTypes.loadingUser });

  fetch(`${backendURL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(async (res) => {
      let response = await res.json();
      if (res.ok) {
        return response;
      } else {
        throw response;
      }
    })
    .then((data) => {
      dispatch({
        type: actionTypes.isFirstTime,
        payload: { firstTime: false },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
