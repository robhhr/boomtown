import React from "react";
import Items from "../pages/Items";
import Home from "../pages/Home/Home";
import Share from "../pages/Share/Share";
import Profile from "../pages/Profile/Profile";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  NavLink
} from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      {/* @TODO: Add your menu component here */}
      <Switch>
        <Route exact path="/items" component={Items} />
        <Route path="/welcome" component={Home} />
        <Route path="/share" component={Share} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/user:Id" component={Profile} />
        {/**
         * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
         *
         * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
         *
         * Later, we'll add logic to send users to one set of routes if they're logged in,
         * or only view the /welcome page if they are not.
         */}
      </Switch>
    </Router>
  );
};

export default Routes;
