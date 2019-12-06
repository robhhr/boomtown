import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import { Card, CardContent, Avatar, Typography } from "@material-ui/core";

const Profile = ({ classes, state, fullname }) => {
  return (
    <>
      <NavBar />
      <div className={classes.profileContainer}>
        <Card className={classes.profileCard}>
          <CardContent>
            <div className={classes.userContainer}>
              <Avatar>lol</Avatar>
              <Typography>fullname</Typography>
            </div>
            <div className={classes.profileItems}>
              <p>
                <span>0</span> items shared,
              </p>
              <p>
                <span>0</span> items borrowed
              </p>
            </div>
            <p>"No bio provided"</p>
          </CardContent>
        </Card>
        <div className={classes.sharedTitle}>
          <Typography variant="h4" color="primary">
            Shared Items
          </Typography>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Profile);
