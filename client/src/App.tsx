import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/" component={Home} />
      </Switch>
    <div>
      <Footer />
    </div>
  </Router>
  );
}

export default App
