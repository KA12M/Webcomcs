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
                         .WithOrigins("http://10.103.0.30", "http://localhost:3020", "https://coms.kru.ac.th", "http://10.103.0.15", "http://coms.kru.ac.th/comsci", "http://coms.kru.ac.th", "http://tee.kru.ac.th", "https://coms.kru.ac.th/comsci");
                    // .SetIsOriginAllowed(origin => true);
                });
            });
        }
    }
}