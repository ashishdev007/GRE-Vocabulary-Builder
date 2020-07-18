export const initialState = {
  isLoading: false,
  firstTime: false,
  isValidated: false,
  token: localStorage.getItem('GRE-auth-token'),
  image: new Image(),
  userID: null,
};

export const actionTypes = {
  loadingUser: 'loadingUser',
  userLoaded: 'userLoaded',
  isFirstTime: 'isFirstTime',
  logOut: 'logOut',
};

export const authReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.loadingUser:
      return { ...state, isLoading: true };

    case actionTypes.userLoaded:
      return { ...state, isLoading: false, ...action.payload };

    case actionTypes.isFirstTime:
      return {
        ...state,
        isLoading: false,
        firstTime: action.payload.firstTime,
      };

    case actionTypes.logOut:
      return { ...state, ...initialState };

    default:
      return state;
  }
};
