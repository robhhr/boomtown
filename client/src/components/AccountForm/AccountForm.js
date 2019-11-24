import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { Form, Field } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { graphql, compose } from "react-apollo";
import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
// import validate from "./helpers/validation";

/**
 * @TODO: Uncomment the following lines when authentication is added to the form
 *
 *
 */

import styles from "./styles";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true // if form toggle true then login if false the signup
    };
  }

  render() {
    const { classes, login, signup } = this.props;
    // const validateValues = values => {
    //   console.log(values);
    // };

    return (
      <Form
        onSubmit={values => {
          const user = {
            variables: {
              user: values
            }
          };
          console.log(values);
          if (this.state.formToggle) {
            console.log(this.props);
            login(user);
            console.log("im trying to login");
          } else {
            console.log("im trying to signup");
          }
        }}
        // validate={validateValues}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name="fullname">
                  {({ input }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{ ...input, autoComplete: "off" }}
                      value={input.value}
                    />
                  )}
                </Field>
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field name="email">
                {({ input }) => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{ ...input, autoComplete: "off" }}
                    value={input.value}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field name="password">
                {({ input }) => (
                  <Input
                    id="password"
                    type="password"
                    inputProps={{ ...input, autoComplete: "off" }}
                    value={input.value}
                  />
                )}
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
                        fullname: "",
                        email: "",
                        password: "",
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
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      query: {
        VIEWER_QUERY
      }
    },
    name: "signup"
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      query: {
        VIEWER_QUERY
      }
    },
    name: "login"
  }),
  withStyles(styles)
)(AccountForm);
