using Microsoft.OpenApi.Models;

namespace API.Extensions;

public static class SwaggerServiceExtension
{
    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            var securityScheme = new OpenApiSecurityScheme
            {
                Scheme = "Bearer",
                Description = "JWT Auth Bearer Schema",
                Type = SecuritySchemeType.Http,
                In = ParameterLocation.Header,
                Name = "Bearer",
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            };
            options.AddSecurityDefinition("Bearer", securityScheme);

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { securityScheme, new List<string>() { "Bearer" } }
            });
        });

        services.AddEndpointsApiExplorer();

        return services;
    }

    public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();

        return app;
    }
}