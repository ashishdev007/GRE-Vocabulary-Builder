import React, { useContext } from 'react';
import { PracticeContext } from './Practice';
import GeneralModal from '../../modals/GeneralModal';
import BrainIcon from '../../assets/brain.svg';
import { actionTypes } from '../../reducers/practiceReducer';

const EndSession = () => {
  const { state, dispatch } = useContext(PracticeContext);
  const DefModal = GeneralModal();
  let { correct, incorrect } = state.attempts;

  const getWords = (array) => {
    return array.map((item) => {
      return (
        <div
          className="ui button attemptedWord"
          onClick={(event) => showWordDef(event.target.innerHTML)}
        >
          {item}
        </div>
      );
    });
  };

  const showWordDef = (word) => {
    let header = () => {
      return <span>{word}</span>;
    };
    let content = () => {
      return (
        <ul className="WordDefinitions">
          <li>Fruit</li>
          <li>Computer</li>
        </ul>
      );
    };
    DefModal.setContents({ header, content, actions: null });
    DefModal.showModal({ confirm: true, parts: ['header', 'content'] });
  };

  return (
    <div className="EndSession">
      {DefModal.Modal()}
      <img src={BrainIcon} alt="brain" id="brainIcon" />
      <h1 className="ui header" style={{ textDecoration: 'underline' }}>
        Practice Session Stats
      </h1>
      <h3 className="ui header" style={{ marginTop: '1rem' }}>
        Total Attempts: {correct.length + incorrect.length}
      </h3>
      <p style={{ marginBottom: '.15rem' }}>
        Correct Answers: {correct.length}
      </p>
      <p>Incorrect Answers: {incorrect.length}</p>
      {correct.length + incorrect.length > 0 ? (
        <div
          className="ui grid"
          style={{ marginTop: '1%', marginBottom: '2%' }}
        >
          <div className="row" style={{ padding: '0' }}>
            <div className="two wide column"></div>
            <div className="six wide column SummaryHeader">
              Correct Attempts
            </div>
            <div className="six wide column SummaryHeader">
              Incorrect Attempts
            </div>
            <div className="two wide column"></div>
          </div>
          <div className="row" style={{ padding: '0' }}>
            <div className="two wide column"></div>
            <div className="six wide column SummaryWords">
              {getWords(correct)}
            </div>
            <div className="six wide column SummaryWords">
              {getWords(incorrect)}
            </div>
            <div className="two wide column"></div>
          </div>
        </div>
      ) : null}
      <div
        className="ui button NewSessionButton"
        onClick={() => dispatch({ type: actionTypes.startNewSession })}
      >
        Practise Again
      </div>
    </div>
  );
};

export default EndSession;
