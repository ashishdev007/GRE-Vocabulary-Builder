export const initialState = {
  sessionLength: 0,
  items: {
    loading: true,
    questions: [],
  },
  attempts: {
    correct: [],
    incorrect: [],
  },
  sessionEnded: false,
};

export const actionTypes = {
  setSessionLength: 'setSessionLength',
  loadingquestions: 'loadingquestions',
  questionsLoaded: 'questionsLoaded',
  endSession: 'endSession',
  startNewSession: 'startNewSession',
  addAttempt: 'addAttempt',
};

export const practiceReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.setSessionLength:
      return {
        ...state,
        sessionLength: action.payload,
      };
    case actionTypes.loadingquestions:
      return {
        ...state,
        items: {
          ...state.items,
          loading: true,
        },
      };
    case actionTypes.questionsLoaded:
      return {
        ...state,
        items: {
          loading: false,
          questions: [...state.items.questions, ...action.payload],
        },
      };
    case actionTypes.addAttempt:
      let { type, word } = action.payload;
      return {
        ...state,
        attempts: {
          ...state.attempts,
          [type]: [...state.attempts[type], word],
        },
      };
    case actionTypes.endSession:
      return {
        ...initialState,
        attempts: state.attempts,
        sessionEnded: true,
      };
    case actionTypes.startNewSession:
      return { ...initialState };
    default:
      return state;
  }
};
