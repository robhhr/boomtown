import React, { Component } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Form, Field } from "react-final-form";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
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
              const user = {
                variables: {
                  user: values
                }
              };
              // console.log("hey");
            }}
            render={({ handleSubmit, form }) => (
              <form className={classes.mainForm} onSubmit={handleSubmit}>
                <h1 className={classes.formTitle}>Share. Borrow. Prosper.</h1>

                <div className={classes.itemForm}>
                  {/* Item image */}
                  <FormControl className={classes.formControl}>
                    <Field
                      name="imageURL"
                      render={({ input }) => (
                        <Button color="primary">Select an image</Button>
                      )}
                    />
                  </FormControl>

                  {/* Item name */}
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name" className={classes.itemName}>
                      Name your Item
                    </InputLabel>
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
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="description"
                      className={classes.itemInput}
                    >
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
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="item-tags"
                      className={classes.tagsInput}
                    >
                      Add some tags
                    </InputLabel>
                    {/* <Field
                    render={({ input }) => (
                    )}
                  /> */}
                  </FormControl>

                  {/* Share button */}
                  <Button type="submit" varient="outlined">
                    Share
                  </Button>
                </div>
              </form>
            )}
          />
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareItemForm);
