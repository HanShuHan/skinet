using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data.Repositories;

namespace Infrastructure.Data.Services
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;

        public ProductService(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> brandRepo, IGenericRepository<ProductType> typeRepo)
        {
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetBrandsAsync()
        {
            return await _brandRepo.ListAllAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productRepo.GetByIdAsync(id);
        }

        public async Task<Product> GetProductByIdWithBrandAndTypeAsync(int id)
        {
            var spec = new ProductsWithBrandsAndTypesSpecification(id);

            return await _productRepo.GetEntityWithSpecAsync(spec);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _productRepo.ListAllAsync();
        }

        public async Task<IReadOnlyList<Product>> GetProductsWithBrandsAndTypesAsync()
        {
            var spec = new ProductsWithBrandsAndTypesSpecification();

            return await _productRepo.ListWithSpecAsync(spec);
        }

        public async Task<IReadOnlyList<ProductType>> GetTypesAsync()
        {
            return await _typeRepo.ListAllAsync();
        }
    }
}