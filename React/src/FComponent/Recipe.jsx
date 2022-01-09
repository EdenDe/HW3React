import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from "../../node_modules/@material-ui/core/Card";
import CardMedia from "../../node_modules/@material-ui/core/CardMedia";
import CardContent from "../../node_modules/@material-ui/core/CardContent";
import Typography from "../../node_modules/@material-ui/core/Typography";
import CardActions from "../../node_modules/@material-ui/core/CardActions";
import Button from "../../node_modules/@material-ui/core/Button";


function Recipe({ id, name, img, CookingMethod, time, Ingredients }) {

  const navigate = useNavigate();

  const ShowIngredients = () => {

    navigate('IngredientsShow',{state: Ingredients} )
  }

  return (

    <Card variant="outlined" style={{
      border: "2px solid purple",
      fontFamily: 'Segoe UI',
      padding: 5,
      margin: 5,
      width: "17%",
      minWidth: 250,
      height: "40ch",
    }}>    
      <CardMedia
        component="img"
        height="50%"
        width="90%"
        image={img} />
      <CardContent>
        <Typography variant="h6" height="20%" width="100%" >
          {name}
        </Typography>
        <Typography gutterBottom component="p" height="20%" style={{ fontFamily: 'Segoe UI' }}>
          Cooking Method: {CookingMethod} <br />
          Time: {time}
        </Typography>
        <CardActions >
          <Button onClick={ShowIngredients} size="small" variant='contained' style={{
            background: "#ff8e53", width: "100%"
          }}> Show Ingredients </Button>
        </CardActions>
      </CardContent>

    </Card>

  )
}

export default Recipe;
