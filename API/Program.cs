using Persistence; 
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Domain;
using API.Installers;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

// My Extensions for install DI    
builder.Services.MyInstallerExtensions(builder);

builder.Services.AddAuthorization();

var app = builder.Build();

using var scope = app.Services.CreateScope();

#region Async connection database run time
try
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    var userMange = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    
    // await context.Database.MigrateAsync();
    // await Seed.SeedData(context, userMange);
}
catch (Exception ex)
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
}
#endregion


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.InjectStylesheet("/swagger-ui/SwaggerDark.css");
    });
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors(CorsInstaller.CorsPolicy);

app.MapHub<ChatHub>("/chat");

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

app.UseAuthentication();
app.UseAuthorization();

await app.RunAsync();
