import React, { useState} from 'react';

import Input from '../../node_modules/@material-ui/core/Input';
import FormGroup from '../../node_modules/@material-ui/core/FormGroup';
import Button from '../../node_modules/@material-ui/core/Button';



const AddIngredient = ({counter,renderIng}) => {

  const [nameS, SetNameS] = useState("");
  const [imageS, SetImageS] = useState("");
  const [caloriesS, SetCaloriesS] = useState("");

  const apiUrl = 'http://proj.ruppin.ac.il/bgroup86/test2/tar2/api/ingredients';

  const ChangeName = (e) => {
    SetNameS(e.target.value)
  }

  const ChangeImg = (e) => {
    SetImageS(e.target.value)
  }

  const ChangeCalories = (e) => {
    SetCaloriesS(e.target.value)
  }

  const AddIngredient = () => {

    SetNameS("");
    SetImageS("");
    SetCaloriesS("");
    console.clear();

    const s = {
      id: counter,
      name: nameS,
      image: imageS,
      calories: caloriesS,
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
          renderIng();
        },
        (error) => {
          console.log("err post=", error);
        });
   
  }

  return (
    <div >
      <FormGroup style={{ display: 'flex', alignItems: 'center',fontSize:20  }}>
        Ingredient name: <br />
        <Input style={{ marginBottom: 10 }} value={nameS} type="text" onChange={ChangeName} /> <br />
        Ingredient Image (url):  <br />
        <Input style={{ marginBottom: 10 }} value={imageS} type="text" onChange={ChangeImg} /> <br />
        Ingredient Calories:  <br />
        <Input style={{ marginBottom: 10 }}value={caloriesS}  type="text" onChange={ChangeCalories} /> <br />

        <Button style={{ backgroundColor: "#B076B4", margin: 20,fontWeight:"bold",width:"20%",minWidth:"20ch",fontSize:18 }} onClick={AddIngredient}> Add Ingredient </Button>
      </FormGroup>
    </div>
  )
}

export default AddIngredient;
