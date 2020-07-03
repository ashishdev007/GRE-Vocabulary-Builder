import { backendURL } from './backend';
import { actionTypes } from '../reducers/practiceReducer';

export const getQuestions = (dispatch) => {
  dispatch({ type: actionTypes.loadingquestions });
  fetch(`${backendURL}/practise/5`, {
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

export const updateWordStats = (name, success) => {
  fetch(`${backendURL}/word/attempt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, success }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.json();
      }
    })
    .then((data) => {})
    .catch(async (err) => {
      let error = await err.json();
      console.log(error);
    });
};
