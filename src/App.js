import "./App.css";
import React, {useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import RootPage from "./pages/admin/RootPage";
import CustomerRootPage from "./pages/customer/RootPage";
import { shortcutKeys } from "./shortcutKeysConfig.js";
import Mousetrap from "mousetrap";
import CustomerRootPage2 from "./pages/customer/RootPage2";
import Helmet from "react-helmet";

function App() {
  useEffect(() => {

    Mousetrap.bind(shortcutKeys.SK01, function () {
      const input = document.getElementById("customer-short-name-input"); 
      const input2 = document.getElementsByTagName("body"); 
      if (typeof input != "undefined" && input != null) {
        
        input.setSelectionRange(0, 0);
        input.focus();
        
      }
      return false;
    });

  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/app/dashboard" />
          </Route>
          <Route path="/app" component={CustomerRootPage2}></Route>
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
      <div className="copyright-note">
        <p>copyright ©2022 all rights reserved <a href="http://perlaso.com/"> PERLASO</a></p>
      </div>
     < Helmet>
     <script>
       {
         `
         document.addEventListener('keydown', (event) => {
          const keyName = event.key;
        
          if (keyName === 'Control') {
            // do not alert when only Control key is pressed.
            return;
          }
        
      //    if (event.ctrlKey) {
            // Even though event.key is not 'Control' (e.g., 'a' is pressed),
            // event.ctrlKey may be true if Ctrl key is pressed at the same time.
        //    alert('Combination of ctrlKey + ');
         // } else {
          //  alert('Key pressed ');
         // }
        }, false);
         `
       }
     </script>
     </Helmet> 
    </div>

  );
}

export default App;
