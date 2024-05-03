using System.Text.Json;
using Core.Entities.OrderAggregate;
using Core.Entities.ProductAggregate;

namespace Infrastructure.Data.Seed
{
    public class StoreContextSeed
    {

        private static StoreDbContext _dbContext;

        public static async Task SeedAsync(StoreDbContext dbContext)
        {
            _dbContext = dbContext;

            SeedProductBrands();
            SeedProductTypes();
            SeedProducts();
            SeedDeliveryMethods();

            if (_dbContext.ChangeTracker.HasChanges())
            {
                await _dbContext.SaveChangesAsync();
            }
        }

        private static void SeedProductBrands()
        {
            if (!_dbContext.ProductBrands.Any())
            {
                var brandsInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/Store/brands.json");
                var brands = JsonSerializer.Deserialize<IReadOnlyList<ProductBrand>>(brandsInText);
                _dbContext.ProductBrands.AddRange(brands);
            }
        }

        private static void SeedProductTypes()
        {
            if (!_dbContext.ProductTypes.Any())
            {
                var typesInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/Store/types.json");
                var types = JsonSerializer.Deserialize<IReadOnlyList<ProductType>>(typesInText);
                _dbContext.ProductTypes.AddRange(types);
            }
        }

        private static void SeedProducts()
        {
            if (!_dbContext.Products.Any())
            {
                var productsInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/Store/products.json");
                var products = JsonSerializer.Deserialize<IReadOnlyList<Product>>(productsInText);
                _dbContext.Products.AddRange(products);
            }
        }
        
        private static void SeedDeliveryMethods()
        {
            if (!_dbContext.DeliveryMethods.Any())
            {
                var deliveryMethodsInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/Store/delivery.json");
                var deliveryMethods = JsonSerializer.Deserialize<IReadOnlyList<DeliveryMethod>>(deliveryMethodsInText);
                
                _dbContext.DeliveryMethods.AddRange(deliveryMethods);
            }
        }
    }
}