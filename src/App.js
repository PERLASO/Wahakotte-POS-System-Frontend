import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import RootPage from "./pages/admin/RootPage";
import CustomerRootPage from "./pages/customer/RootPage";

function App() {
  const handleKeyPress = useCallback((event) => {
    if (event.shiftKey === true) {
      var element = document.getElementById("invoiceList-customer-name-input");
      if (element != null) {
        console.log("alkalkdsfa");
      }

      console.log(`Key pressed: ${event.key}`);
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app/dashboard" />
          </Route>
          <Route path="/app" component={CustomerRootPage}></Route>
          <Route exact path="/login" component={AuthPage}></Route>
          <Route exact path="/registration" component={AuthPage}></Route>
          <Route
            exact
            path="/password-reset-account-verify"
            component={AuthPage}
          ></Route>
          <Route exact path="/password-reset" component={AuthPage}></Route>
          {/* Admin Routers */}
          <Route path="/admin" component={RootPage}></Route>
          <Route exact path="" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
