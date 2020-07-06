import React, { useContext, useEffect } from 'react';
import { PracticeContext } from './Practice';
import { actionTypes } from '../../reducers/practiceReducer';

const StartSession = () => {
  const { state, dispatch } = useContext(PracticeContext);

  const generateOptions = () => {
    let options = [];
    let no = 10;

    while (no <= 30) {
      options.push(
        <div
          className="ui button"
          key={no}
          onClick={(event) => {
            optionSelect(event.target.innerText);
          }}
        >
          {no}
        </div>
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
      <div>{generateOptions()}</div>
    </React.Fragment>
  );
};

export default StartSession;
