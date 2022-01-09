import React from 'react';

import Card from "../../node_modules/@material-ui/core/Card";
import CardMedia from "../../node_modules/@material-ui/core/CardMedia";
import CardContent from "../../node_modules/@material-ui/core/CardContent";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Checkbox from '../../node_modules/@material-ui/core/Checkbox';

function Ingredient({ id, name, img, calories,papa,ChangeCheck }) {
  var check="";
  if(papa=="withCheckBox")
  {
     check= <Checkbox value={id} onChange={ChangeCheck}/>
  }

  return (

      <Card variant="outlined"  style={{border: "1px solid purple",
       fontFamily: 'Segoe UI',
       padding:5,
        margin:5,
       width:"15%",
       minWidth: 180,
       height: "30ch",
      }}>
    
        <CardMedia
          component="img"
          height="50%"
          width="90%"
          image={img} />
        <CardContent>
          <Typography   variant="h6" height="20%"  width="100%" >
            {name}
          </Typography>
          <Typography gutterBottom component="p" height="20%" style={{ fontFamily: 'Segoe UI'}}>
            Calories: {calories}
          </Typography>
          {check}
        </CardContent>
      </Card>
  
  )
}

export default Ingredient
