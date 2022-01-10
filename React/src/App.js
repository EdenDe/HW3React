
import './App.css';
import React, { useState, useEffect } from 'react';

import Button from '../node_modules/@material-ui/core/Button';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import EHeader from "./Elements/EHeader"
import RecHeader from "./Elements/RecHeader"
import AddRecipe from "./Pages/AddRecipe";
import AddIngredient from "./Pages/AddIngredient";
import IngredientsShow from './Pages/IngredientsShow';
import Recipe from "./FComponent/Recipe";
import Home from "./Pages/Home";

import Box from "../node_modules/@material-ui/core/Box"


const styles = {
  btnClass: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: 15,
    width: 300,
    height: 100,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: 'Segoe UI',
    color: "purple",
  }
}

function App() {

  const [listIng, SetlistIng] = useState([]);

  const renderIngredients=()=>{

    let temp = [];
    const apiUrl = 'http://proj.ruppin.ac.il/bgroup86/test2/tar2/api/ingredients';

    fetch(apiUrl, {
      method: 'GET',
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
          console.log("fetch btnFetchGetingredients= ", result);
          result.map(ing => {
            temp = [...temp,
            {
              id: ing.id,
              name: ing.name,
              image: ing.image,
              calories: ing.calories
            }];
          })

          SetlistIng(temp);
        },
        (error) => {
          console.log("err post=", error);
        });

  }
 
  useEffect(() => {

    renderIngredients();

  }, [])

  const [listRec, SetlistRec] = useState([]);

  const RenderRecipes=()=>{
    let temp = [];

    const apiUrl = 'http://proj.ruppin.ac.il/bgroup86/test2/tar2/api/Recipes';

    fetch(apiUrl, {
      method: 'GET',
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
          console.log("fetch btnFetchGetRecipe= ", result);
          result.map(rec => {
            temp = [...temp,
            {
              id: rec.id,
              name: rec.name,
              image: rec.image,
              CookingMethod: rec.CookingMethod,
              time: rec.time,
              Ingredients: rec.Ingredients,
            }];
          })
          SetlistRec(temp);
        },
        (error) => {
          console.log("err post=", error);
        });

  }

  useEffect(() => {
    RenderRecipes();
   
  }, [])

  return (
    <BrowserRouter>
      <div className="App" style={{ fontFamily: 'Segoe UI' }}>
        {EHeader}
        <Box style={ {marginBottom: 20}}>
          <Link to="/AddIngredient" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              style={styles.btnClass}>   Add Ingredient   </Button> </Link>
          <Link to="/AddRecipe" style={{ textDecoration: "none" }} >
            <Button
              variant="contained"
              size="large"
              style={styles.btnClass}>   Add Recipe   </Button> </Link>
        </Box>
 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddIngredient" element={<AddIngredient counter={listIng.length + 1} renderIng={renderIngredients} />} />
            <Route path="/AddRecipe" element={<AddRecipe listIng={listIng} counter={listRec.length + 1} renderRec={RenderRecipes} />} />
            <Route path="/IngredientsShow" element={<IngredientsShow/>} />
          </Routes>
              
         {RecHeader} 
         
        <Box display='flex' flexDirection='row'  justifyContent='space-around'
          alignItems='center' flexWrap='wrap'   style={{margin:"auto",width:"100%", maxWidth:"170ch"}} >
          
          {
            listRec.map((rec) => {
              return (
                <Recipe key={rec.id} id={rec.id} name={rec.name} img={rec.image} CookingMethod={rec.CookingMethod} time={rec.time} Ingredients={rec.Ingredients} />
              )
            })
          }

        </Box>
      
      </div>
    </BrowserRouter>
  );

}
export default App;
