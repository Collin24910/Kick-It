import React from "react";
import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import withAnalytics, { initAnalytics } from "react-with-analytics";

import LoginPage from "../container/LoginPage";
import RegisterPage from "../container/RegisterPage";

initAnalytics("UA-126201794-1");
export const history = createHistory();

const Root = () => (
  <Switch>
    {/*<Route exact path="/" component={HomePage} />*/}
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    {/*<Route path="/profile/:id" component={ProfilePage} />
    <Route component={NotFound} />*/}
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
