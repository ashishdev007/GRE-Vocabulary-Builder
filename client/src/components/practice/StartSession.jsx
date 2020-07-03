import React, { useContext, useEffect } from 'react';
import { PracticeContext } from './Practice';
import { actionTypes } from '../../reducers/practiceReducer';
import history from '../../history';
import { Redirect, useRouteMatch } from 'react-router-dom';

const StartSession = () => {
  const { state, dispatch } = useContext(PracticeContext);

  const generateOptions = () => {
    let options = [];
    let no = 10;

    while (no <= 30) {
      options.push(
        <li key={no}>
          <button
            onClick={(event) => {
              optionSelect(event.target.innerText);
            }}
          >
            {no}
          </button>
        </li>
      );

      no += 10;
    }

    return options;
  };

  const optionSelect = (number) => {
    dispatch({ type: actionTypes.setSessionLength, payload: number });
  };

  useEffect(() => {}, [state.sessionLength]);

  return (
    <React.Fragment>
      <h1>Please select number of questions.</h1>
      {state.sessionLength !== 0 ? <Redirect to={`/practice/session`} /> : null}
      <ul>{generateOptions()}</ul>
    </React.Fragment>
  );
};

export default StartSession;
