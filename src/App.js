import React from "react";
import "./App.css";
import Header from "./Header";
import Info from "./Info";
import InputForm from "./InputForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <InputForm />
            <Info />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
