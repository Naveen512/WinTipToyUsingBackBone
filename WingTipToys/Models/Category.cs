﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WingTipToys.Models
{
    public class Category
    {
        [ScaffoldColumn(false)]
        public int CategoryID { get; set; }

        public string CategoryName { get; set; }

        [Display(Name ="Product Description")]
        public string Description { get; set; }

        public virtual ICollection<Product> Products { get; set; }
      
    }
}