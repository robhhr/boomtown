import { Query } from "react-apollo";
import React, { Fragment } from "react";
import { VIEWER_QUERY } from "../apollo/queries";

const ViewerContext = React.createContext();

// const ViewerProvider = ({ children }) => {
/**
 * @TODO: Create the ViewerContext provider to supply information about
 * the currently logged-in user throughout the application.
 *
 * Replace the <Fragment /> component with an Apollo <Query /> component
 * with a <ViewerContext.Provider /> nested inside that wrap the children.
 */
// return (
// <Query query={VIEWER_QUERY}>
//   {{ data, loading }} =>{" "}
//   {
//     return (
//       <ViewerContext.Provider value={(data.viewer, loading)} > {children} </ViewerContext.Provider>
//     )
//   }{" "}
// </Query>
//   );
// };

export { ViewerProvider };
export default ViewerContext;
