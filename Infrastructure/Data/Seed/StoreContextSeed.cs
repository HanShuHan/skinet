using System.Text.Json;
using Core.Entities;
using Infrastructure.Data.Context;
using SQLitePCL;

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

            if (_dbContext.ChangeTracker.HasChanges())
            {
                await _dbContext.SaveChangesAsync();
            }
        }

        private static void SeedProductBrands()
        {
            if (!_dbContext.ProductBrands.Any())
            {
                var brandsInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/brands.json");
                var brands = JsonSerializer.Deserialize<IReadOnlyList<ProductBrand>>(brandsInText);
                _dbContext.ProductBrands.AddRange(brands);
            }
        }

        private static void SeedProductTypes()
        {
            if (!_dbContext.ProductTypes.Any())
            {
                var typesInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/types.json");
                var types = JsonSerializer.Deserialize<IReadOnlyList<ProductType>>(typesInText);
                _dbContext.ProductTypes.AddRange(types);
            }
        }

        private static void SeedProducts()
        {
            if (!_dbContext.Products.Any())
            {
                var productsInText = File.ReadAllText("../Infrastructure/Data/Seed/Data/products.json");
                var products = JsonSerializer.Deserialize<IReadOnlyList<Product>>(productsInText);
                _dbContext.Products.AddRange(products);
            }
        }
    }
}