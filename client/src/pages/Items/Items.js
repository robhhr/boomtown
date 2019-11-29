import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Item from "../../components/Item";
import NavBar from "../../components/NavBar/NavBar";

const Items = ({ classes }) => {
  return (
    <div>
      <NavBar />
      <Item />
    </div>
  );
};

export default withStyles(styles)(Items);
