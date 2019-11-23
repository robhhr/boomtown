import React, { Component } from "react";
import ItemPreviewContext from "./context/ItemPreviewProvider";
// import { Form, Field } from "react-final-form";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.classes);
    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => {
          <div>
            <p>This is the share form.</p>
            <p>share item text demo</p>
          </div>;
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default ShareForm;
