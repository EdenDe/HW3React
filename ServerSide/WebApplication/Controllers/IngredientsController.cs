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
    public class IngredientsController : ApiController
    {
        // GET: api/Ingredients
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                Group86MyKitchenDbContext db = new Group86MyKitchenDbContext();

                var yo = db.Ingredients.ToList();
                
                return Ok(yo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
         
        }

        //// GET: api/Ingredients/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Ingredients
        [HttpPost]
        public IHttpActionResult Post([FromBody] Ingredient ing)
        {
            try
            {
                Group86MyKitchenDbContext db = new Group86MyKitchenDbContext();

                db.Ingredients.Add(ing);
                db.SaveChanges();

                return Ok(ing);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT: api/Ingredients/5
        //    public void Put(int id, [FromBody]string value)
        //    {
        //    }

        //    // DELETE: api/Ingredients/5
        //    public void Delete(int id)
        //    {
        //    }
    }
}
