export const initialState = {
  newWordErrors: { exists: false, nature: 'None', msg: '' },
};

export const actionTypes = {
  wordDoesntExist: 'wordDoesntExist',
  wordAlreadyExist: 'wordAlreadyExist',
  clearNewWordErrors: 'clearNewWordErrors',
};

export const errorsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.wordDoesntExist:
      return {
        ...state,
        newWordErrors: {
          exists: true,
          nature: 'wordDoesntExist',
          msg: action.payload,
        },
      };
    case actionTypes.wordAlreadyExist:
      return {
        ...state,
        newWordErrors: {
          exists: true,
          nature: 'wordAlreadyExist',
          msg: action.payload,
        },
      };
    case actionTypes.clearNewWordErrors:
      return {
        ...state,
        newWordErrors: {
          ...initialState.newWordErrors,
        },
      };
    default:
      return state;
  }
};
