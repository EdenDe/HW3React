import React, { useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import Ingredient from '../FComponent/Ingredient';
import IngHeader from '../Elements/IngHeader';

import Box from '../../node_modules/@material-ui/core/Box';
import Button from '../../node_modules/@material-ui/core/Button'

function IngredientsShow() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const hideIng = () => {
    navigate('Home');
  }

  let PressedRec = state;

  if (PressedRec == null) {
    return "";
  }

  return (
    <Box style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(255, 142, 83)",
      zIndex: 1,
      border: "1px solid black",
    }}>
      <Button onClick={hideIng} style={{ backgroundColor: "transparent",fontSize:20}}> X </Button>
      {IngHeader}
      <Box display='flex' flexDirection='row' justifyContent='space-around'
        alignItems='center' flexWrap='wrap' width='100%'  >

        {
          PressedRec.map((ing) => {

            return (
              <Ingredient key={ing.id} papa="" id={ing.id} name={ing.name} img={ing.image} calories={ing.calories} ChangeCheck="" />
            )
          })

        }
      </Box>
    </Box>
  )
}

export default IngredientsShow
