import React, { useEffect, useReducer, useMemo } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import history from '../../history';
import StartSession from './StartSession';
import { practiceReducer, initialState } from '../../reducers/practiceReducer';
import MCQs from './MCQs';
import EndSession from './EndSession';

export const PracticeContext = React.createContext();

const Practice = (props) => {
  let match = useRouteMatch();
  const [state, dispatch] = useReducer(practiceReducer, initialState);

  // useEffect(() => {}, []);

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
        <Route exact path={`${match.url}/session`} component={MCQs} />
      </Switch>
    );
  };

  const content = () => {
    if (state.sessionLength === 0) {
      if (state.sessionEnded) return <EndSession />;
      else return <StartSession />;
    } else return <MCQs />;
  };

  return (
    <PracticeContext.Provider value={contextValue}>
      {content()}
      {switches()}
    </PracticeContext.Provider>
  );
};

export default Practice;
