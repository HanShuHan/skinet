using System.Reflection;
using Core.Entities.BasketAggregate;
using Core.Entities.OrderAggregate;
using Core.Entities.ProductAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Data
{
    public class StoreDbContext : DbContext
    {
        // Product
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        
        // Basket
        public DbSet<BasketItem> BasketItems { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        
        // Order
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<ShippingAddress> ShippingAddresses { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
        
        public StoreDbContext(DbContextOptions<StoreDbContext> options, IConfiguration config) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            
            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                    }
                }
            }
        }
    }
}