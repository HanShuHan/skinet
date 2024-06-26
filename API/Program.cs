using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Data.Seed;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};
app.MapGet("/weatherforecast", () =>
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
                new WeatherForecast
                (
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
            .ToArray();
        return forecast;
    })
    .WithName("GetWeatherForecast")
    .WithOpenApi();

app.UseStaticFiles();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Create Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var logger = services.GetRequiredService<ILogger<Program>>();
    var storeContext = services.GetRequiredService<StoreDbContext>();
    var identityContext = services.GetRequiredService<AppIdentityDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    try
    {
        await storeContext.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(storeContext);

        await identityContext.Database.MigrateAsync();
        await AppIdentityDbContextSeed.SeedAsync(userManager);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error happened during the database creation from the migration files");
    }
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}