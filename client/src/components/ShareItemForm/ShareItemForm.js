import React, { Component } from "react";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import ViewerContext from "../../context/ViewerProvider";
import { compose, graphql } from "react-apollo";
import {
  ALL_TAGS_QUERY,
  ADD_ITEM_MUTATION,
  ALL_ITEMS_QUERY
} from "../../apollo/queries";
import { Form, Field } from "react-final-form";
import { Checkbox, ListItemText, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class ShareItemForm extends Component {
  render() {
    const { classes, totalTags, addItem } = this.props;

    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => (
          <ItemPreviewContext.Consumer>
            {({ updatePreview, resetPreview }) => (
              <Form
                onSubmit={values => {
                  const addItemMutation = {
                    variables: {
                      item: {
                        title: values.title,
                        description: values.description,
                        tags: values.tags.map(tag => parseInt(tag))
                      }
                    }
                  };
                  addItem(addItemMutation);
                }}
                render={({ handleSubmit }) => (
                  <form
                    onSubmit={handleSubmit}
                    onChange={e => updatePreview(e.target.name, e.target.value)}
                    className={classes.form}
                  >
                    <FormControl className={classes.formControl}>
                      <h1 className={classes.formTitle}>
                        Share. Borrow. Prosper.
                      </h1>
                    </FormControl>

                    <div className={classes.itemForm}>
                      {/* Item image */}
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="imageUrl">Add image</InputLabel>
                        <Field
                          name="imageURL"
                          render={({ input, meta }) => (
                            <Input
                              id="itemImg"
                              type="text"
                              error={meta.touched && !!meta.error}
                              inputProps={{
                                ...input,
                                autoComplete: "off"
                              }}
                              value={input.value}
                            />
                          )}
                        />
                      </FormControl>

                      {/* Item name */}
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="title">Name your Item</InputLabel>
                        <Field
                          name="title"
                          render={({ input, meta }) => (
                            <Input
                              id="title"
                              type="text"
                              error={meta.touched && !!meta.error}
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
                      <FormControl className={classes.formControlDescription}>
                        <InputLabel htmlFor="description">
                          Describe your Item
                        </InputLabel>
                        <Field
                          name="description"
                          render={({ input, meta }) => (
                            <Input
                              id="description"
                              type="text"
                              error={meta.touched && !!meta.error}
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
                            const { value, onChange, ...inputProps } = input;
                            return (
                              <>
                                <Select
                                  id="tags"
                                  className={classes.formControl}
                                  multiple
                                  value={value || []}
                                  onChange={e =>
                                    updatePreview(
                                      "tags",
                                      totalTags
                                        ? totalTags.tags.filter(({ id }) =>
                                            e.target.value.includes(String(id))
                                          )
                                        : []
                                    ) || onChange(e)
                                  }
                                  renderValue={values =>
                                    values
                                      .map(
                                        value =>
                                          totalTags.tags.find(
                                            ({ id }) => id === value
                                          ).title
                                      )
                                      .join(", ")
                                  }
                                  inputProps={inputProps}
                                >
                                  {totalTags &&
                                    totalTags.tags &&
                                    totalTags.tags.map(({ id, title }) => (
                                      <MenuItem
                                        key={id}
                                        className={classes.formOption}
                                        value={id}
                                      >
                                        <Checkbox
                                          checked={
                                            !!(
                                              value &&
                                              value.some(
                                                selectedId => selectedId === id
                                              )
                                            )
                                          }
                                        />
                                        <ListItemText primary={title} />
                                      </MenuItem>
                                    ))}
                                </Select>
                              </>
                            );
                          }}
                        />
                      </FormControl>

                      {/* Share button */}
                      <FormControl>
                        <Button
                          type="submit"
                          className={classes.submitForm}
                          variant="outlined"
                          size="large"
                          color="secondary"
                        >
                          Share
                        </Button>
                      </FormControl>
                    </div>
                  </form>
                )}
              />
            )}
          </ItemPreviewContext.Consumer>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default compose(
  graphql(ALL_TAGS_QUERY, {
    options: {
      query: {
        ALL_TAGS_QUERY
      }
    },
    name: "totalTags"
  }),
  graphql(ADD_ITEM_MUTATION, {
    options: {
      query: {
        ALL_ITEMS_QUERY
      }
    },
    name: "addItem"
  }),
  withStyles(styles)
)(ShareItemForm);
