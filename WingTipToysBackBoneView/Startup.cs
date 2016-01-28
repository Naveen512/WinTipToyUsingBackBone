using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WingTipToysBackBoneView.Startup))]
namespace WingTipToysBackBoneView
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
