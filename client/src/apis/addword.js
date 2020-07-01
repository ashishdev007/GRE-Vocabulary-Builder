import { backendURL } from './backend';

export const getNewWordDefs = (setDefs, word) => {
  console.log(`${backendURL}/word/${word}`);
  fetch(`${backendURL}/word/${word}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let response = await res.json();
      console.log('Here');
      if (res.ok) {
        return response;
      } else {
        throw response;
      }
    })
    .then((data) => {
      setDefs(data.meanings);
    })
    .catch((err) => {});
};
