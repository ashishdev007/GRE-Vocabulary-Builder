import React, { useContext, useEffect, useState } from 'react';
import { PracticeContext } from './Practice';
import '../../css/MCQs.css';

import LoaderModal from '../../modals/LoaderModal';
import { getQuestions } from '../../apis/practice';
import Question from './Question';
import { actionTypes } from '../../reducers/practiceReducer';

const MCQs = () => {
  const [question, setQuestion] = useState({});
  const [questionNo, setQuestionNo] = useState(0);
  const { state, dispatch } = useContext(PracticeContext);
  const [buttonClass, setButtonClass] = useState(
    'ui primary large button disabled'
  );
  useEffect(() => {
    getQuestions(dispatch);
  }, []);
  useEffect(() => {
    if (state.items.questions.length > 0) {
      setQuestion(state.items.questions[questionNo]);
    }
  }, [state.items.questions]);

  const getNewWord = () => {
    if (state.items.questions.length > questionNo + 1) {
      setQuestion(state.items.questions[questionNo + 1]);
      setQuestionNo(questionNo + 1);
      setButtonClass('ui primary large button disabled');
    } else {
      dispatch({ type: actionTypes.endSession });
    }
  };

  const enableNextButton = () => {
    setButtonClass('ui primary large button');
  };

  if (state.items.loading) {
    return <LoaderModal />;
  } else {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="ui row">
            <div className="two wide column center aligned"></div>
            <div className="twelve wide column left aligned">
              <Question
                question={question}
                enableNextButton={enableNextButton}
              />
              <button className={buttonClass} onClick={getNewWord}>
                Next
              </button>
            </div>
            <div className="two wide column center aligned"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default MCQs;
