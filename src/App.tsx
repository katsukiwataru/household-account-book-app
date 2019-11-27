import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './plugins/history';
import Home from './container/home.tsx';

const App: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
