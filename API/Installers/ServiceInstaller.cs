

using System.Reflection; 
using Autofac;
using Autofac.Extensions.DependencyInjection; 

namespace API.Installers
{
    public class ServiceInstaller : IInstallers
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory(containerBuilder =>
            {
                containerBuilder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
                .Where(t => t.Name.EndsWith("Service"));
            })); 
        }
    }
}