using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Data.Entity;
using WingTipToys.Models;

[assembly: OwinStartup(typeof(WingTipToys.Startup))]

namespace WingTipToys
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            Database.SetInitializer(new ProducDatabeInitializer());
        }
    }
}
