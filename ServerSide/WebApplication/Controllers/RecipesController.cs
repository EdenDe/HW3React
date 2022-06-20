using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DATA;

namespace WebApplication.Controllers
{
    [EnableCors("*", "*", "*")]
    public class RecipesController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                Group86MyKitchenDbContext db = new Group86MyKitchenDbContext();

                List<Recipe> foo = db.Recipes.ToList();
          
                List<DtoRecepie> resList = new List<DtoRecepie>();

                foreach (var rec in foo)
                {
                    List<Ingredient> temp = new List<Ingredient>();

                    foreach (var ingInRec in rec.IngredientsInRecipes)
                    {
                        Ingredient ingChose = db.Ingredients.FirstOrDefault(x => x.id == ingInRec.ingredientId);

                        if (ingChose!=null)
                        {
                            temp.Add(ingChose);
                        }
                      
                    }

                    DtoRecepie tempDto = new DtoRecepie
                    {
                        id = rec.id,
                        name = rec.name,
                        image = rec.image,
                        time = rec.time,
                        CookingMethod = rec.CookingMethod,
                        Ingredients = temp

                    };

                    resList.Add(tempDto);
                }
            
                return Ok(resList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody] DtoRecepie rec)
        {
            try
            {
                Group86MyKitchenDbContext db = new Group86MyKitchenDbContext();
    
                Recipe r = new Recipe
                {
                    id = rec.id,
                    name = rec.name,
                    image = rec.image,
                    CookingMethod = rec.CookingMethod,
                    time = rec.time,                
                };

                db.Recipes.Add(r);

                db.SaveChanges();

                IngredientsInRecipe temp;

                foreach (var item in rec.Ingredients)
                {
                    temp = new IngredientsInRecipe
                    {
                        ingredientId = item.id,
                        recipeId = rec.id,
                        dummy = 1
                    };


                    db.IngredientsInRecipes.Add(temp);
                }

                db.SaveChanges();

                return Ok(rec);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<controller>/5
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}

    }
}

       
  