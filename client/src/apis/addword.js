import { backendURL } from './backend';
import { actionTypes } from '../reducers/errorsReducer';

export const getNewWordDefs = (setDefs, word, dispatch) => {
  fetch(`${backendURL}/word/${word}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let response = await res.json();

      if (res.ok) {
        return response;
      } else {
        throw response.message;
      }
    })
    .then((data) => {
      setDefs(data.meanings);
    })
    .catch(async (err) => {
      dispatch({ type: actionTypes.wordDoesntExist, payload: err });
    });
};

export const addNewWord = (word, meanings, dispatch, setSuccess) => {
  let data = {
    word,
    meanings,
  };
  fetch(`${backendURL}/word`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
      setSuccess(true);
    })
    .catch((err) => {
      dispatch({ type: actionTypes.wordAlreadyExist, payload: err.message });
    });
};
