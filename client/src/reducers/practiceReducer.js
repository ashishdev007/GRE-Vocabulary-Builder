export const initialState = {
  sessionLength: 0,
  items: {
    loading: false,
    questions: [],
  },
};

export const actionTypes = {
  setSessionLength: 'setSessionLength',
  loadingquestions: 'loadingquestions',
  questionsLoaded: 'questionsLoaded',
  endSession: 'endSession',
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
    case actionTypes.endSession:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
