import React, { useEffect, useReducer, useMemo } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import history from '../../history';
import StartSession from './StartSession';
import { practiceReducer, initialState } from '../../reducers/practiceReducer';
import MCQs from './MCQs';

export const PracticeContext = React.createContext();

const Practice = (props) => {
  let match = useRouteMatch();
  const [state, dispatch] = useReducer(practiceReducer, initialState);

  useEffect(() => {}, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  const switches = () => {
    return (
      <Switch>
        <Route
          exact
          path={`${match.url}/start-session`}
          component={StartSession}
        />
      </Switch>
    );
  };

  return (
    <PracticeContext.Provider value={contextValue}>
      {state.sessionLength === 0 ? (
        <Redirect to={`${match.url}/start-session`} />
      ) : (
        <MCQs />
      )}
      {switches()}
    </PracticeContext.Provider>
  );
};

export default Practice;
