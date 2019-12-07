import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import Paper from "@material-ui/core/Paper";
import { ShareItemPreview } from "../ShareItemPreview/ShareItemPreview";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#212121",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    height: 140,
    width: 100
  },
  itemContainer: {
    margin: "80px 0"
  }
}));

const Item = () => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  // const handleChange = event => {
  //   setSpacing(Number(event.target.value));
  // };

  return (
    <Grid container className={classes.root} spacing={2}>
      {/* {items.map(item => ( */}
      <Grid item xs={3} className={classes.itemContainer}>
        <Grid container spacing={spacing} className={classes.itemList}>
          <ShareItemPreview />
        </Grid>
      </Grid>
      {/* ))} */}
    </Grid>
  );
};

export default Item;
