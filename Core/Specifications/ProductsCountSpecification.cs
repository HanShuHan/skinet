using Core.Entities;

namespace Core.Specifications
{
    public class ProductsCountSpecification : BaseSpecification<Product>
    {
        public ProductsCountSpecification(ProductSpecParams specParams)
            : base(p =>
                ((!specParams.BrandId.HasValue || specParams.BrandId < 1) || p.ProductBrandId == specParams.BrandId)
                && ((!specParams.TypeId.HasValue || specParams.TypeId < 1) || p.ProductTypeId == specParams.TypeId)
                && (string.IsNullOrEmpty(specParams.Search) || p.Name.ToLower().Contains(specParams.Search.ToLower()))
            )
        { }
    }
}