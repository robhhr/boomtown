import React, { Component } from "react";
import Profile from "./Profile";
// import {ViewerContext} from '../../context/ViewerProvider'
// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    return (
      <>
        <Profile />
      </>
    );
  }
}

export default ProfileContainer;
