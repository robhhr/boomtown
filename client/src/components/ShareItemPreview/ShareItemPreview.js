import React, { Component } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import CardPreview from "./CardPreview/CardPreview";

export class ShareItemPreview extends Component {
  render() {
    return (
      <ItemPreviewContext.Consumer>
        {({ state }) => (
          <>
            <CardPreview
              title={state.item.title}
              description={state.item.description}
              imageURL={state.item.imageURL}
              itemowner={state.item.itemowner}
            />
          </>
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareItemPreview);
