import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App
