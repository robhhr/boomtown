import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ViewerContext from "../../../context/ViewerProvider";
import Card from "@material-ui/core/Card";
import Gravatar from "react-gravatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CardPreview = ({ itemowner, title, description, imageURL, tags }) => {
  const useStyles = makeStyles({
    card: {
      width: 415,
      height: 520,
      marginRight: 100
    }
  });
  const classes = useStyles();
  const history = useHistory();
  const { viewer } = useContext(ViewerContext);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia component="img" height="280" image={imageURL} />

        <CardContent>
          <Gravatar default="robohash" email={viewer.email} />
          <Typography gutterBottom variant="h5" component="h2">
            {viewer.fullname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tags ? tags.map(({ title }) => title).join(", ") : null}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPreview;
