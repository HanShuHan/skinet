using System.Text.Json;
using Core.Entities;
using SQLitePCL;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {

        private static StoreContext _context;

        public static async Task SeedAsync(StoreContext context)
        {
            _context = context;

            SeedProductBrands();
            SeedProductTypes();
            SeedProducts();

            if (_context.ChangeTracker.HasChanges())
            {
                await _context.SaveChangesAsync();
            }
        }

        private static void SeedProductBrands()
        {
            if (!_context.ProductBrands.Any())
            {
                var brandsInText = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<IReadOnlyList<ProductBrand>>(brandsInText);
                _context.ProductBrands.AddRange(brands);
            }
        }

        private static void SeedProductTypes()
        {
            if (!_context.ProductTypes.Any())
            {
                var typesInText = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<IReadOnlyList<ProductType>>(typesInText);
                _context.ProductTypes.AddRange(types);
            }
        }

        private static void SeedProducts()
        {
            if (!_context.Products.Any())
            {
                var productsInText = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<IReadOnlyList<Product>>(productsInText);
                _context.Products.AddRange(products);
            }
        }
    }
}