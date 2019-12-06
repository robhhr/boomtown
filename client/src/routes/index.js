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
        if (loading) return <p>Loading</p>;
        console.log("viewer1", viewer);
        if (!viewer) {
          console.log("viewer2", viewer);
          return (
            <Switch>
              <Route path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" /* to="/items" */ />
            </Switch>
          );
        } else {
          return (
            <Switch>
              <Route path="/items" component={Items} />
              <Route path="/share" component={Share} />
              <Route path="/profile" component={Profile} />
              <Route path="/profile/userid" component={Profile} />
              <Redirect from="*" to="/items" /* to='/items' */ />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  );
};

export default Routes;
