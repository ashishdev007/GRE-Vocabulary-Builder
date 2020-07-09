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
