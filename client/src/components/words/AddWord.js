import React, { useState, useReducer } from 'react';
import { getNewWordDefs, addNewWord } from '../../apis/addword';
import { errorsReducer, initialState } from '../../reducers/errorsReducer';
import '../../css/AddWord.css';

const AddWord = () => {
  const [word, setWord] = useState('');
  const [defs, setDefs] = useState([]);
  const [selections, setSelections] = useState([]);
  const [success, setSuccess] = useState(false);
  const [state, dispatch] = useReducer(errorsReducer, initialState);

  const getDefs = () => {
    let key = 0;
    if (defs.length === 0) return null;
    else {
      return defs.map((item) => {
        key++;
        return (
          <div
            className={`Definition ui segment option`}
            key={key}
            onClick={(event) => {
              event.stopPropagation();
              let style = event.target.style;
              let { color, bgColor } = getSelectionStyle(item);
              style.color = color;
              style.backgroundColor = bgColor;
            }}
          >
            {item}
          </div>
        );
      });
    }
  };

  const getSelectionStyle = (def) => {
    let color, bgColor;
    if (selections.includes(def)) {
      color = 'rgba(0,0,0,.87)';
      bgColor = 'white';
      let updatedSelections = selections.filter((selected) => selected !== def);
      setSelections(updatedSelections);
    } else {
      color = 'white';
      bgColor = '#2185d0';
      setSelections([...selections, def]);
    }

    return { color, bgColor };
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: '5%' }}>
        <h1 className="ui header" style={{ textDecoration: 'underline' }}>
          Add a New Word
        </h1>
        <form
          className={`ui form`}
          onSubmit={(event) => {
            event.preventDefault();
            setDefs([]);
            setSuccess(false);
            getNewWordDefs(setDefs, word, dispatch);
            dispatch({ type: 'clearNewWordErrors' });
          }}
        >
          <div className={`SearchForm ui icon input`}>
            <input
              type="text"
              placeholder="Search..."
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
            <i className="search icon" type="submit"></i>
          </div>
        </form>
        {defs.length === 0 ? null : (
          <div style={{ marginTop: '2%', marginBottom: '5%' }}>
            <h3 className="ui header">Please choose a definition!</h3>
            <div className={`ui segments Definitions`}>{getDefs()}</div>
            <button
              className={`ui green button ${
                selections.length <= 0 ? 'disabled' : ''
              }`}
              onClick={(event) => {
                event.stopPropagation();
                setDefs([]);
                setWord([]);
                addNewWord(word, selections, dispatch, setSuccess);
              }}
            >
              Submit
            </button>
          </div>
        )}
        {state.newWordErrors.exists ? (
          <div className={`MessageContainer`}>
            <i className={`ErrorIcon exclamation triangle icon`}></i>
            <p>{state.newWordErrors.msg}</p>
          </div>
        ) : null}
        {success ? (
          <div className={`MessageContainer`}>
            <i className={`SuccessIcon save outline icon`}></i>
            <p>Successfully added your word!</p>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default AddWord;
