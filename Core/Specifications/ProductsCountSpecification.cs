using System.Linq.Expressions;
using Core.Entities;
using Core.Entities.ProductAggregate;

namespace Core.Specifications
{
    public class ProductsCountSpecification : BaseSpecification<Product>
    {
        public ProductsCountSpecification(ProductsSpecificationParams specificationParams)
            : base(p =>
                (specificationParams.BrandId < 1 || p.ProductBrandId == specificationParams.BrandId)
                && (specificationParams.TypeId < 1 || p.ProductTypeId == specificationParams.TypeId)
                && (string.IsNullOrEmpty(specificationParams.Search) ||
                    p.Name.ToLower().Contains(specificationParams.Search.ToLower()))
            )
        {
        }
    }
}