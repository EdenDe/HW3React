using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DATA;

namespace WebApplication
{
    public class DtoRecepie
    {
      
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string CookingMethod { get; set; }
        public int time { get; set; }

        public virtual List<Ingredient> Ingredients { get; set; }
    }
}