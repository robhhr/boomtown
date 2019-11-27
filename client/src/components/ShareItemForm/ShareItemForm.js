import React, { Component } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Form, Field } from "react-final-form";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.classes);

    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (
          <Form
            onSubmit={values => {
              // const user = {
              //   variables: {
              //     user: values
              //   }
              // };
              // console.log("hey");
            }}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <h1>Share. Borrow. Prosper.</h1>

                {/* Item image */}
                <FormControl>
                  <Field
                    name="imageURL"
                    render={({ input }) => (
                      <Button color="primary">Select an image</Button>
                    )}
                  />
                </FormControl>

                {/* Item name */}
                <FormControl className={classes.FormControl}>
                  <InputLabel htmlFor="name">Name your Item</InputLabel>
                  <Field name="item-name">
                    {({ input }) => (
                      <Input
                        id="item-name"
                        type="text"
                        inputProps={{ ...input, autoComplete: "off" }}
                        value={input.value}
                      />
                    )}
                  </Field>
                </FormControl>

                {/* Item description */}
                <FormControl>
                  <InputLabel htmlFor="description">
                    Describe your Item
                  </InputLabel>
                  <Field name="item-description">
                    {({ input }) => (
                      <Input
                        id="item-description"
                        type="text"
                        inputProps={{ ...input, autoComplete: "off" }}
                        value={input.value}
                      />
                    )}
                  </Field>
                </FormControl>

                {/* Item tags */}
                <FormControl>
                  <InputLabel htmlFor="item-tags">Add some tags</InputLabel>
                  {/* <Field
                    render={({ input }) => (
                    )}
                  /> */}
                </FormControl>

                {/* Share button */}
                <Button type="submit" varient="outlined">
                  Share
                </Button>
              </form>
            )}
          />
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareItemForm);
