using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public interface IProductService
    {
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<Product>> GetProductsWithBrandsAndTypesAsync();
        Task<IReadOnlyList<ProductBrand>> GetBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> GetProductByIdWithBrandAndTypeAsync(int id);
    }
}