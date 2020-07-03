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
      //   dispatch({ type: actionTypes.wordDoesntExist, payload: err });
    });
};
