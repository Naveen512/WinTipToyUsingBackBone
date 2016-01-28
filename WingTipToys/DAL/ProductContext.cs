using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WingTipToys.Models;

namespace WingTipToys.DAL
{
    public class ProductContext:DbContext
    {
        public ProductContext() : base("WingTipToys")
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}