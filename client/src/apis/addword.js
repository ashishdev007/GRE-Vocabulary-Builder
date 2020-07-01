import { backendURL } from './backend';

export const getNewWordDefs = (setDefs, word) => {
  fetch(`${backendURL}/word/${word}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { word },
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
    .catch((err) => {});
};
