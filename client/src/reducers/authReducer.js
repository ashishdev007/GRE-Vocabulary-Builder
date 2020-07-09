export const initialState = {
  isLoading: false,
  firstTime: true,
  isValidated: false,
  token: localStorage.getItem('GRE-auth-token'),
  image: new Image(),
  userID: null,
};

export const actionTypes = {
  loadingUser: 'loadingUser',
  userLoaded: 'userLoaded',
  logOut: 'logOut',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.loadingUser:
      return { ...state, isLoading: true };

    case actionTypes.userLoaded:
      return { ...state, ...action.payload };

    case actionTypes.logOut:
      return { ...state, ...initialState };

    default:
      return state;
  }
};
