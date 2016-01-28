using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WingTipToys.DAL;

namespace WingTipToys.Controllers
{
    [EnableCors("*", "*", "*")]
    public class CategoryProductController : ApiController
    {
        
        private ProductContext prodContext = new ProductContext();
        [HttpGet]
        public HttpResponseMessage GetCategoryList()
        {
            return Request.CreateResponse(HttpStatusCode.OK, prodContext.Categories.ToList(),System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);
        }

        [HttpGet]
        public HttpResponseMessage GetProductBasedOnCategoryId(int categoryID)
        {
            var productCollection = prodContext.Products.Where(_ => _.CategoryID == categoryID).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, productCollection, System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);
        }
    }
}
