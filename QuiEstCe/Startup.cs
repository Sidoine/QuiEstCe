using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.StaticFiles;

namespace WebApplication2
{
    public class Startup
    {
        public void Configure(IBuilder app)
        {
            app.UseServices(services =>
            {
                services.AddMvc();
                services.AddSignalR();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "api",
                    template: "{controller}/{id?}");
            });

            app.UseSignalR("/signalr", new HubConfiguration());

            app.UseStaticFiles();

            app.Run(async context =>
            {
                await context.Response.WriteAsync(new Classlibrary1.Class1().Name);
            });
        }
    }
}
