import { backendURL } from './backend';
import { actionTypes } from '../reducers/errorsReducer';

export const getNewWordDefs = (setDefs, word, dispatch) => {
  fetch(`${backendURL}/word/${word}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .then((data) => {
      setDefs(data.meanings);
    })
    .catch((err) => {
      dispatch({ type: actionTypes.wordDoesntExist, payload: err.message });
    });
};

export const addNewWord = (word, meanings, dispatch) => {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .then((data) => {})
    .catch((err) => {
      dispatch({ type: actionTypes.wordAlreadyExist, payload: err.message });
    });
};
