import React from "react";
import Items from "../pages/Items/Items";
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

class Layout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <NavBar /> */}
          <Switch>
            <Route exact path="/items" component={Items} />
            <Route path="/welcome" component={Home} />
            <Route path="/share" component={Share} />
            <Route path="/profile" component={Profile} />
            <Route path="/profile/user:Id" component={Profile} />
            {/* <Redirect from='*' to='/items' component={NotFound} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Layout;
