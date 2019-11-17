import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { Form, Field } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
/**
 * @TODO: Uncomment the following lines when authentication is added to the form
 *
 *
 * import {
 *    LOGIN_MUTATION,
 *    SIGNUP_MUTATION,
 *    VIEWER_QUERY
 * } from '../../apollo/queries';
 * import { graphql, compose } from 'react-apollo';
 * import validate from './helpers/validation'
 */

import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Form
        onSubmit={values => {
          console.log(values);
        }}
        // validate={}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name="fullname">
                  {/* @TODO: Wrap in a Final Form <Field /> */}
                  {({ input }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: "off"
                      }}
                      value={Input.value}
                    />
                  )}
                </Field>
                {/* @TODO: Close Final Form <Field /> */}
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field name="email">
                {/* @TODO: Wrap in a Final Form <Field /> */}
                {({ input }) => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: "off"
                    }}
                    value={Input.value}
                  />
                )}
                {/* @TODO: Close Final Form <Field /> */}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field name="password">
                {/* @TODO: Wrap in a Final Form <Field /> */}
                {({ input }) => (
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      autoComplete: "off"
                    }}
                    value={Input.value}
                  />
                )}
                {/* @TODO: Close Final Form <Field /> */}
              </Field>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={
                    false // @TODO: This prop should depend on pristine or valid state of form
                  }
                >
                  {this.state.formToggle ? "Enter" : "Create Account"}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? "Create an account."
                      : "Login to existing account."}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {/* @TODO: Display sign-up and login errors */}
            </Typography>
          </form>
        )}
      />
    );
  }
}

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
export default withStyles(styles)(AccountForm);
