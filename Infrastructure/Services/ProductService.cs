using Core.Entities.ProductAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;

namespace Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork<StoreDbContext> _unitOfWork;

        public ProductService(IUnitOfWork<StoreDbContext> unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _unitOfWork.Repository<Product>();
            _unitOfWork.Repository<ProductBrand>();
            _unitOfWork.Repository<ProductType>();
        }

        public async Task<int> CountAsync(ProductsSpecificationParams specificationParams)
        {
            var spec =  new ProductsCountSpecification(specificationParams);
            
            return await _unitOfWork.Repository<Product>().CountAsync(spec);
        }

        public async Task<IReadOnlyList<ProductBrand>> GetBrandsAsync()
        {
            return await _unitOfWork.Repository<ProductBrand>().ListAllAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _unitOfWork.Repository<Product>().GetByIdAsync(id);
        }
        
        public async Task<IReadOnlyList<Product>> GetProductsByIdsAsync(IEnumerable<int> ids)
        {
            return await _unitOfWork.Repository<Product>().GetByIdsAsync(ids);
        }

        public async Task<Product> GetProductByIdWithBrandAndTypeAsync(int id)
        {
            var spec = new ProductsWithBrandsAndTypesSpecification(id);

            return await _unitOfWork.Repository<Product>().GetWithSpecsAsync(spec);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _unitOfWork.Repository<Product>().ListAllAsync();
        }

        public async Task<IReadOnlyList<Product>> GetProductsWithBrandsAndTypesAsync(ProductsSpecificationParams specificationParams)
        {
            var spec = new ProductsWithBrandsAndTypesSpecification(specificationParams);

            return await _unitOfWork.Repository<Product>().ListWithSpecsAsync(spec);
        }

        public async Task<IReadOnlyList<ProductType>> GetTypesAsync()
        {
            return await _unitOfWork.Repository<ProductType>().ListAllAsync();
        }
    }
}