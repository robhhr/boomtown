import React, { Component } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import ViewerContext from "../../context/ViewerProvider";
import { Mutation, compose, graphql } from "react-apollo";
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from "../../apollo/queries";
import { Form, Field } from "react-final-form";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", tags: [] };
  }

  render() {
    const { classes } = this.props;
    const { tags } = this.props;
    const { addItem } = this.props;

    const handleTags = e => {
      this.setState({
        tags: e.target.value
      });
    };

    const itemTags = [
      "Household Items",
      "Tools",
      "Electronics",
      "Physical Media",
      "Sporting Goods",
      "Musical Instruments",
      "Recreational Equiqment"
    ];

    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <ItemPreviewContext.Consumer>
            {({ state, updatePreview, resetPreview }) => (
              <Mutation mutation={ADD_ITEM_MUTATION}>
                {(addItem, { data }) => {
                  return (
                    <Form
                      onSubmit={values => {
                        const itemSubmit = {
                          variables: {
                            item: {
                              title: values.itemname,
                              description: values.itemdescription,
                              tags: values.tags
                            }
                          }
                        };
                        addItem(itemSubmit);
                      }}
                      // validate={values => console.log(values)}
                      render={({ handleSubmit, form }) => (
                        <form
                          className={classes.mainForm}
                          onSubmit={e => {
                            e.preventDefault();
                            handleSubmit();
                            resetPreview();
                          }}
                          onChange={e =>
                            updatePreview(e.target.name, e.target.value)
                          }
                        >
                          <h1 className={classes.formTitle}>
                            Share. Borrow. Prosper.
                          </h1>

                          <div className={classes.itemForm}>
                            {/* Item image */}
                            <FormControl className={classes.formControl}>
                              <Field
                                name="imageURL"
                                render={({ input }) => (
                                  <Button color="primary">
                                    Select an image
                                  </Button>
                                )}
                              />
                            </FormControl>

                            {/* Item name */}
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="title">
                                Name your Item
                              </InputLabel>
                              <Field
                                name="title"
                                render={({ input }) => (
                                  <Input
                                    id="title"
                                    type="text"
                                    inputProps={{
                                      ...input,
                                      autoComplete: "off"
                                    }}
                                    value={input.value}
                                  />
                                )}
                              />
                            </FormControl>

                            {/* Item description */}
                            <FormControl
                              className={classes.formControlDescription}
                            >
                              <InputLabel htmlFor="description">
                                Describe your Item
                              </InputLabel>
                              <Field
                                name="description"
                                render={({ input }) => (
                                  <Input
                                    id="description"
                                    type="text"
                                    inputProps={{
                                      ...input,
                                      autoComplete: "off"
                                    }}
                                    value={input.value}
                                  />
                                )}
                              />
                            </FormControl>

                            {/* Item tags */}
                            <FormControl className={classes.formControl}>
                              <InputLabel
                                htmlFor="item-tags"
                                className={classes.tagsInput}
                              >
                                Add some tags
                              </InputLabel>
                              <Field
                                name="tags"
                                render={({ input }) => {
                                  return (
                                    <>
                                      <Select
                                        // id="tags"
                                        className={classes.formControl}
                                        fullWidth
                                        multiple
                                        input={<Input />}
                                        value={this.state.tags}
                                        onChange={e => {
                                          this.setState({
                                            tags: e.target.value
                                          });
                                          updatePreview({
                                            tags: this.createTags(
                                              e.target.value
                                            )
                                          });
                                        }}
                                        renderValue={selected =>
                                          selected.join(", ")
                                        }
                                        input={<Input />}
                                      >
                                        {itemTags.map(option => (
                                          <MenuItem
                                            key={itemTags[2]}
                                            value={itemTags[2]}
                                          >
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </>
                                  );
                                }}
                              />
                            </FormControl>

                            {/* Share button */}
                            <Button
                              type="submit"
                              className={classes.submitForm}
                              variant="outlined"
                            >
                              Share
                            </Button>
                          </div>
                        </form>
                      )}
                    />
                  );
                }}
              </Mutation>
            )}
          </ItemPreviewContext.Consumer>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default compose(
  graphql(ADD_ITEM_MUTATION, {
    options: {
      query: {
        ALL_ITEMS_QUERY
      }
    },
    name: "addItemMutation"
  }),
  withStyles(styles)
)(ShareItemForm);
