import React, { Component } from "react";
import ItemPreviewProvider from "./context/ItemPreviewProvider";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ItemPreviewProvider.Consumer>
        {({ state, updatePreview, resetPreview }) => {
          <div>
            <p>This is the share form.</p>
          </div>;
        }}
      </ItemPreviewProvider.Consumer>
    );
  }
}

export default ShareForm;
