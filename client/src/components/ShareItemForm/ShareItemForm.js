import React, { Component } from "react";
import ItemPreviewContext from "./context/ItemPreviewProvider";
import { Form, Field } from "react-final-form";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  Button
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import styles from "./styles";

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
          <Form
            onSubmit={values => {
              const user = {
                variables: {
                  user: values
                }
              };
            }}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <h1>Share. Borrow. Prosper.</h1>

                {/* Item image */}
                <FormControl>
                  <Field
                    name="imageURL"
                    render={({ input }) => (
                      <>
                        <Button color="primary">Select an image</Button>
                      </>
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
                  <Select
                    fullWidth
                    multiple
                    value={input.value}
                    input={<Input />}
                  ></Select>
                </FormControl>

                {/* Share button */}
                <Button type="submit" varient="outlined">
                  Share
                </Button>
              </form>
            )}
          />;
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareForm);
