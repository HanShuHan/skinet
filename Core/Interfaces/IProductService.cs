using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
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