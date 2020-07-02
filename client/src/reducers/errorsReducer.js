export const initialState = {
  newWordErrors: { exists: false, nature: 'None', msg: '' },
};

export const actionTypes = {
  wordDoesntExist: 'wordDoesntExist',
  wordAlreadyExist: 'wordAlreadyExist',
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
    case actionTypes.wordDoesntExist:
      return {
        ...state,
        newWordErrors: {
          exists: true,
          nature: 'wordAlreadyExist',
          msg: action.payload,
        },
      };
  }
};
