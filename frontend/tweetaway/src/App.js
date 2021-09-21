import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Home from "./pages/home/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/">
          <LoginSignup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
