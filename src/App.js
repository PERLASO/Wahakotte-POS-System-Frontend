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
  
    Mousetrap.bind(shortcutKeys.SK01, function (e) {
      const input = document.getElementById("list-search-data"); 
      const input2 = document.getElementsByTagName("body"); 
      if (typeof input != "undefined" && input != null) {
        
        input.setSelectionRange(0, 0);
        input.focus();
      }
      return false;
    });

    Mousetrap.bind(shortcutKeys.SK02, function (e) {
      const input = document.getElementById("invoice-search-product"); 
      const input2 = document.getElementsByTagName("body"); 
      if (typeof input != "undefined" && input != null) {
        
        input.setSelectionRange(0, 0);
        input.focus();
      }
      return false;
    });

    Mousetrap.bind(shortcutKeys.SKreturn, function (e) {
      const input = document.getElementById("proceed"); 

      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });

    Mousetrap.bind(shortcutKeys.createInvoice, function (e) {
      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue = false
      }
  
      const input = document.getElementById("create-invoice-btn");
      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });

    Mousetrap.bind(shortcutKeys.dashboard, function (e) {
      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue = false
      }
      const input = document.getElementById("goto-dashboard-btn");
      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });
    
    Mousetrap.bind(shortcutKeys.customer, function (e) {
      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue = false
      }
  
      const input = document.getElementById("goto-customer-btn");
      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });

    Mousetrap.bind(shortcutKeys.product, function (e) {

      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue = false
      }
  
      const input = document.getElementById("goto-product-btn");
      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });
    
    Mousetrap.bind(shortcutKeys.invoice, function (e) {
      if(e.preventDefault){
        e.preventDefault();
      }else{
        e.returnValue = false
      }
  
      const input = document.getElementById("goto-invoice-btn");
      if (typeof input != "undefined" && input != null) {
        
        input.click();
      }
      return false;
    });
  },[]);

  let redirect ;

  if(localStorage.getItem('loginState') === 'true'){
    redirect =  <Redirect to="/app/dashboard" />
  }
  else{
    redirect =  <Redirect to="/login" />
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
           {redirect}
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
    </div>

  );
}

export default App;
