import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import BoomtownLogo from "./BoomtownLogo/BoomtownLogo";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    margin: 0,
    padding: 0
  },
  toolbar: {
    height: 65,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end"
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    // <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <BoomtownLogo />
        </IconButton>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          {/* <MenuIcon /> */}
        </IconButton>
        {/* <IconButton aria-label="search" color="inherit"> */}
        {/* <SearchIcon /> */}
        {/* </IconButton> */}
        <IconButton
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    // </div>
  );
}
