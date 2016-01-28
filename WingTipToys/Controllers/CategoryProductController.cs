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
            return Request.CreateResponse(HttpStatusCode.OK, prodContext.Products.ToList(),System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);
        }
    }
}
