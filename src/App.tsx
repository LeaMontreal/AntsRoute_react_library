import React from "react";
import "./App.css";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";

import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js"; // manually import
import { oktaConfig } from "./lib/oktaConfig";
import { Security, LoginCallback } from "@okta/okta-react"; // manually import
import LoginWidget from "./Auth/LoginWidget";
import { ReviewListPage } from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage";

const oktaAuth = new OktaAuth(oktaConfig.oidc);

// myDebugForOkta
// console.log(oktaAuth);

export const App = () => {
  const history = useHistory();
  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />

        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBooksPage />
            </Route>
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>

            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>

            <Route
              path="/login"
              // render={() => <LoginWidget config={oktaConfig} />}
              render={() => <LoginWidget config={oktaConfig.oidc} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
          </Switch>
        </div>

        <Footer />
      </Security>
    </div>
  );
};
