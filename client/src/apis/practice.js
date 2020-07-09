import { backendURL } from './backend';
import { actionTypes } from '../reducers/practiceReducer';

export const getQuestions = (dispatch, noOfQuestions) => {
  dispatch({ type: actionTypes.loadingquestions });
  fetch(`${backendURL}/practise/${noOfQuestions}`, {
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
      dispatch({ type: actionTypes.questionsLoaded, payload: data.wordList });
    })
    .catch(async (err) => {
      console.log(err);
    });
};

export const updateWordStats = (name, success, dispatch) => {
  let type = success ? 'correct' : 'incorrect';
  dispatch({ type: actionTypes.addAttempt, payload: { type, word: name } });
  fetch(`${backendURL}/word/attempt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, success }),
  })
    .then(async (res) => {
      let response = await res.json();
      if (res.ok) {
        return response;
      } else {
        throw response;
      }
    })
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getMeaning = (word) => {
  return fetch(`${backendURL}/meaning/${word}`, {
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
        throw response;
      }
    })
    .then((data) => {
      let meanings = data.meanings;
      return meanings;
    })
    .catch((err) => {
      console.log(err);
    });
};
