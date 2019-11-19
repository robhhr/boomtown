import React, { Component } from "react";
import { ItemPreviewContext } from "../ShareItemForm/context/ItemPreviewProvider";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

export class ShareItemPreview extends Component {
  render() {
    return (
      <ItemPreviewContext.Consumer>
        {({ state }) => (
          <>
            <h1>{state.title}</h1>
          </>
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareItemPreview);
