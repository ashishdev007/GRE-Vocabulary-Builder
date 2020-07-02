import React, { useState } from 'react';
import { getNewWordDefs, addNewWord } from '../../apis/addword';
// import { makeStyles } from '@material-ui/core/styles';
import styles from '../../css/AddWord.module.css';

const AddWord = () => {
  const [word, setWord] = useState('');

  const [defs, setDefs] = useState([]);
  const [selections, setSelections] = useState([]);

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
              let style = event.target.style;

              selectDef(item, style);
            }}
          >
            {item}
          </div>
        );
      });
    }
  };

  const selectDef = (def, style) => {
    if (selections.includes(def)) {
      style.color = 'rgba(0,0,0,.87)';
      style.backgroundColor = 'white';
      let updatedSelections = selections.filter((selected) => selected !== def);
      setSelections(updatedSelections);
    } else {
      style.color = 'white';
      style.backgroundColor = '#2185d0';
      setSelections([...selections, def]);
    }
  };

  return (
    <React.Fragment>
      <form
        className={`ui form`}
        onSubmit={(event) => {
          event.preventDefault();
          setDefs([]);
          getNewWordDefs(setDefs, word);
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
            onClick={() => addNewWord(word, selections)}
          >
            Olive
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width: 400,
//   },
//   input: {
//     marginLeft: theme.spacing(1),
//     flex: 1,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
// }));

// const AddWord = () => {
//   const classes = useStyles();
//   return (
//     <div>

//         <Paper component="form" className={styles.SearchForm} >
//           <InputBase
//             placeholder="Search your word"
//             className={styles.SearchItem}
//             value={'Hello'}
//           />
//           <IconButton type="submit">
//             <SearchIcon />
//           </IconButton>
//         </Paper>

//     </div>
//   );
// };

export default AddWord;
