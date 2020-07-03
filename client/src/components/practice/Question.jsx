import React, { useState, useEffect, useContext } from 'react';
import { PracticeContext } from './Practice';

import { updateWordStats } from '../../apis/practice';

const Question = (props) => {
  const [selected, setSelected] = useState(false);
  const [colors, setColors] = useState(['white', 'white', 'white', 'white']);
  const { state, dispatch } = useContext(PracticeContext);

  useEffect(() => {
    setSelected(false);
    setColors(['white', 'white', 'white', 'white']);
  }, [props.question]);

  const checkSelection = (selection) => {
    if (!selected) {
      let correct = 0;
      let selected = 0;

      for (let i = 0; i < colors.length; i++) {
        if (selection === props.question.options[i]) {
          selected = i;
        }

        if (props.question.options[i] === props.question.right) {
          correct = i;
        }
      }

      let tempColors = [...colors];
      if (correct === selected) {
        updateWordStats(props.question.name, true, dispatch);
        tempColors[correct] = 'green';
      } else {
        updateWordStats(props.question.name, false, dispatch);
        tempColors[selected] = 'red';
        setTimeout(() => {
          tempColors[correct] = 'green';
          setColors([...tempColors]);
        }, 400);
      }

      setColors([...tempColors]);
      setSelected(true);
      props.enableNextButton();
    }
  };

  return (
    <>
      <h3 id="word" className="ui huge header test">
        {props.question.name}
      </h3>
      <div className="ui divider"></div>

      <div className="optionBox">
        <Options
          options={props.question.options}
          colors={colors}
          checkSelection={checkSelection}
        />
      </div>
    </>
  );
};

const Options = (props) => {
  const renderOptions = (given) => {
    let key = -1;
    if (!given.options) return null;
    else
      return given.options.map((option) => {
        key++;
        return (
          <div
            className="ui segment option MyOption"
            onClick={(event) => {
              props.checkSelection(event.target.innerHTML);
            }}
            key={key}
            style={{ backgroundColor: given.colors[key] }}
          >
            {option}
          </div>
        );
      });
  };

  return <>{renderOptions(props)}</>;
};

export default Question;
