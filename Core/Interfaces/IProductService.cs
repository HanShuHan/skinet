using Core.Entities.ProductAggregate;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IProductService
    {
        Task<int> CountAsync(ProductsSpecificationParams specificationParams);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<IReadOnlyList<Product>> GetProductsWithBrandsAndTypesAsync(ProductsSpecificationParams specificationParams);
        Task<IReadOnlyList<ProductBrand>> GetBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetTypesAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsByIdsAsync(IEnumerable<int> ids);

        Task<Product> GetProductByIdWithBrandAndTypeAsync(int id);
    }
}