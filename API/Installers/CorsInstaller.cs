namespace API.Installers
{
    public class CorsInstaller : IInstallers
    {
        public static string CorsPolicy = "CorsPolicy";

        public void InstallServices(WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy, policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("WWW-Authenticate", "Pagination")
                        .WithOrigins("http://localhost:3020", "http://10.120.4.97:3020", "http://10.103.0.15", "http://a1.coms.kru.ac.th");
                });
            });
        }
    }
}