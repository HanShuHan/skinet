using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Data.Repositories
{
    public interface IProductService
    {
        Task<int> CountAsync(ProductSpecParams specParams);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<Product>> GetProductsWithBrandsAndTypesAsync(ProductSpecParams specParams);
        Task<IReadOnlyList<ProductBrand>> GetBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> GetProductByIdWithBrandAndTypeAsync(int id);
    }
}