import React, { useState, useReducer } from 'react';
import { getNewWordDefs, addNewWord } from '../../apis/addword';
import { errorsReducer, initialState } from '../../reducers/errorsReducer';
import styles from '../../css/AddWord.module.css';

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
            className={`${styles.Definition} ui segment option`}
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
        <div className={`${styles.SearchForm} ui icon input`}>
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
        <div style={{ marginTop: '2%' }}>
          <p>Please choose a definition!</p>
          <div className={`ui segments ${styles.Definitions}`}>{getDefs()}</div>
          <button
            className="ui inverted olive button"
            onClick={(event) => {
              event.stopPropagation();
              setDefs([]);
              setWord([]);
              addNewWord(word, selections, dispatch, setSuccess);
              console.log('lsdfhgsdflhgs');
            }}
          >
            Olive
          </button>
        </div>
      )}
      {state.newWordErrors.exists ? (
        <div className={`${styles.MessageContainer}`}>
          <i className={`${styles.ErrorIcon} exclamation triangle icon`}></i>
          <p>{state.newWordErrors.msg}</p>
        </div>
      ) : null}
      {success ? (
        <div className={`${styles.MessageContainer}`}>
          <i className={`${styles.SuccessIcon} save outline icon`}></i>
          <p>Successfully added your word!</p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AddWord;
