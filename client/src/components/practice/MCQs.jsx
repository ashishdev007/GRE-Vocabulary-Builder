import React, { useContext, useEffect, useState } from 'react';
import { PracticeContext } from './Practice';

import LoaderModal from '../../modals/LoaderModal';
import { getQuestions } from '../../apis/practice';
import Question from './Question';

const MCQs = () => {
  const [question, setQuestion] = useState({});
  const { state, dispatch } = useContext(PracticeContext);
  useEffect(() => {
    getQuestions(dispatch);
  }, []);
  useEffect(() => {
    if (state.items.questions.length > 0) {
      setQuestion(state.items.questions[0]);
    }
  }, [state.items.questions]);

  if (state.items.loading) {
    return <LoaderModal />;
  } else {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="ui row">
            <div className="two wide column center aligned"></div>
            <div className="twelve wide column left aligned">
              <Question question={question} />
              {/* <NextButton /> */}
            </div>
            <div className="two wide column center aligned"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default MCQs;
