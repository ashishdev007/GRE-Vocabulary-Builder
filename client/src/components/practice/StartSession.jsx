import React, { useContext, useEffect, useState } from 'react';
import { PracticeContext } from './Practice';
import { actionTypes } from '../../reducers/practiceReducer';

const StartSession = () => {
  const { state, dispatch } = useContext(PracticeContext);
  const [customVal, setCustomVal] = useState('');

  const generateOptions = () => {
    let options = [];
    let no = 10;

    while (no <= 30) {
      options.push(
        <div
          className="ui button NoOfQuestions"
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
    <div style={{ marginTop: '5rem' }}>
      <h1>Please select the number of words.</h1>
      <div style={{ marginTop: '3rem' }}>{generateOptions()}</div>
      <form
        className="CustomNoOfQuestions"
        onSubmit={(event) => {
          event.preventDefault();
          optionSelect(parseInt(customVal));
        }}
      >
        <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Custom: </span>
        <div class="ui input">
          <input
            type="text"
            value={customVal}
            onChange={(event) => setCustomVal(event.currentTarget.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default StartSession;
