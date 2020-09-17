import React from "react";
import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import withAnalytics, { initAnalytics } from "react-with-analytics";

import ProfilePage from "../container/ProfilePage";
import LoginPage from "../container/LoginPage";
import RegisterPage from "../container/RegisterPage";
import UsersPage from "../container/UsersPage";
import HomePage from "../container/HomePage";
import SettingsPage from "../container/SettingsPage";
import ThreadPage from "../container/ThreadPage";

initAnalytics("UA-126201794-1");
export const history = createHistory();

const Root = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signup" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/Users" component={UsersPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/profile/:id" component={ProfilePage} />
    <Route path="/threadPage/:id" component={ThreadPage} />
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
