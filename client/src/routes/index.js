import React from "react";
import Items from "../pages/Items";
import Home from "../pages/Home/Home";
import Share from "../pages/Share/Share";
import Profile from "../pages/Profile/Profile";
import ViewerContext from "../context/ViewerProvider";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const Routes = () => {
  return (
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (!viewer) {
          console.log("viewer", viewer);
          return (
            <Router>
              <Switch>
                <Route path="/welcome" component={Home} />
                <Redirect from="/" to="/welcome" /* to='/items' */ />
              </Switch>
            </Router>
          );
        } else {
          return (
            <Router>
              <Switch>
                <Route exact path="/items" component={Items} />
                <Route path="/welcome" component={Home} />
                <Route path="/share" component={Share} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile/user:Id" component={Profile} />
                <Redirect from="/" to="/welcome" /* to='/items' */ />
              </Switch>
            </Router>
          );
        }
      }}
    </ViewerContext.Consumer>
  );
};

export default Routes;
