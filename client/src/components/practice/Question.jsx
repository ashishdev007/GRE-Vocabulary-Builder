import React from 'react';

const Question = (props) => {
  const renderOptions = () => {
    return null;
  };

  return (
    <>
      <h3 id="word" className="ui huge header test">
        {props.question.name}
      </h3>
      <div className="ui divider"></div>
      <div className="optionBox">{renderOptions()}</div>
    </>
  );
};

export default Question;
