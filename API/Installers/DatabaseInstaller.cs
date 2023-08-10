using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Installers
{
    public class DatabaseInstaller : IInstallers
    {
        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<DataContext>(options =>
            {
                // timestamp something for postgresql
                // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
 
                options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection"));
                // options.UseNpgsql("Server=localhost;Port=5432;Database=webcomcs;User Id=root;Password=secret;");
                // options.UseSqlite("Data Source=webcomcs.db");
            });
        }
    }
}