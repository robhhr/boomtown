import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Item from "../../components/Item";
import NavBar from "../../components/NavBar/NavBar";

const ItemContainer = ({ classes, items }) => {
  return <Item />;
};

const Items = ({ classes }) => {
  return (
    <div>
      <NavBar />
      <ItemContainer />
    </div>
  );
};

export default withStyles(styles)(Items);
