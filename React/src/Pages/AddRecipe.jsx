import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ingredient from '../FComponent/Ingredient';

import Input from '../../node_modules/@material-ui/core/Input';
import FormGroup from '../../node_modules/@material-ui/core/FormGroup';
import Button from '../../node_modules/@material-ui/core/Button';
import Box from '../../node_modules/@material-ui/core/Box';

const AddRecipe = ({ listIng, counter,renderRec }) => {

  const [nameS, SetNameS] = useState();
  const [imageS, SetImageS] = useState();
  const [CookingMethod, SetCookingMethodS] = useState();
  const [Time, SetTimeS] = useState(0);
  const [checkIng, SetCheckIng] = useState([]);

  let navigate = useNavigate();

  const apiUrl = 'https://localhost:44312/api/recipes';

  const ChangeName = (e) => {
    SetNameS(e.target.value)
  }

  const ChangeImg = (e) => {
    SetImageS(e.target.value)
  }

  const ChangeCookingMethod = (e) => {
    SetCookingMethodS(e.target.value)
  }

  const ChangeTime = (e) => {
    SetTimeS(Number(e.target.value))
  }

  const ChangeCheck = (e) => {

    if (e.target.checked) {

      let temp = [...checkIng, Number(e.target.value)];

      SetCheckIng(temp);

    }
    else {
      let temp = checkIng.filter(x => x !== Number(e.target.value));

      SetCheckIng(temp);
    }

  }

  const AddRecToList = () => {

    console.clear();

    let temp = [];

    for (let item in checkIng) {
      for (let x in listIng) {

        if (checkIng[item] === listIng[x].id) {
          temp.push(listIng[x]);
        }
      }

    }

    const s = {
      id: counter,
      name: nameS,
      image: imageS,
      CookingMethod: CookingMethod,
      time: Time,
      Ingredients: temp
    };

    console.log(s)

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(s),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          renderRec();
          navigate('Home');
        },
        (error) => {
          console.log("err post=", error);
        });
  }


  return (
    <div>
      <FormGroup style={{ display: 'flex', alignItems: 'center',fontSize:20 }}>
        Recipe name: <br />
        <Input style={{ marginBottom: 10 }} type="text" onChange={ChangeName} /> <br />
        Recipe image (url):  <br />
        <Input style={{ marginBottom: 10 }} type="text" onChange={ChangeImg} /> <br />
        Recipe cooking method:  <br />
        <Input style={{ marginBottom: 10 }} type="text" onChange={ChangeCookingMethod} /> <br />
        Recipe cooking time:  <br />
        <Input style={{ marginBottom: 10 }} type="text" onChange={ChangeTime} /> <br />

        <p style={{fontWeight:"bold",fontSize:30}}> Choose Ingredients: </p>
        <Box display='flex' flexDirection='row' width='100%'
          justifyContent='space-evenly' alignItems='center' flexWrap='wrap' style={{marginBottom:30}}>

          {
            listIng.map((ing) => {

              return (
                <Ingredient key={ing.id} papa="withCheckBox" id={ing.id} name={ing.name} img={ing.image} calories={ing.calories} ChangeCheck={ChangeCheck} />
              )
            })
          }

        </Box>

        <Button style={{ backgroundColor: "#B076B4", margin: 20, fontWeight: "bold", width:"26%", fontSize:30 }} variant="contained" onClick={AddRecToList}> Add Recipe </Button>

      </FormGroup>

    </div>
  )
}

export default AddRecipe;