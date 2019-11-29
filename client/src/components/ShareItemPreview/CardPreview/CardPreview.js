import React from "react";
import { Card, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const CardPreview = ({ imageURL, itemowner, title, description }) => {
  const useStyles = makeStyles({
    card: {
      width: 415,
      height: 520,
      marginRight: 50
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="item-image"
          height="200"
          image={imageURL || "http://placecorgi.com/500/500"}
          title="Pepping dog"
        />
        <CardContent>
          <Avatar src={itemowner} />
          <Typography gutterBottom variant="h5" component="h2">
            {title} hello title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description} hello description
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
