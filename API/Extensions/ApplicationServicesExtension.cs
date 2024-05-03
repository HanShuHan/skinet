using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<StoreDbContext>(option =>
            {
                option.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            
            services.AddSingleton<IConnectionMultiplexer>(provider =>
            { 
                var option = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(option);
            });
            
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
            
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage);
                    var response = new ApiValidationErrorResponse(errors);

                    return new BadRequestObjectResult(response);
                };
            });

            services.AddCors(opt => opt.AddPolicy(
                "CorsPolicy",
                policy => policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(["https://localhost:4200"])
            ));

            return services;
        }
    }
}