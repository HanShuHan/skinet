using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandsAndTypesSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandsAndTypesSpecification()
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
            OrderBy = p => p.Name;
        }

        public ProductsWithBrandsAndTypesSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }

        public ProductsWithBrandsAndTypesSpecification(ProductSpecParams specParams)
            : base(p =>
                ((!specParams.BrandId.HasValue || specParams.BrandId < 1) || p.ProductBrandId == specParams.BrandId)
                && ((!specParams.TypeId.HasValue || specParams.TypeId < 1) || p.ProductTypeId == specParams.TypeId)
                && (string.IsNullOrEmpty(specParams.Search) || p.Name.ToLower().Contains(specParams.Search.ToLower()))
            )
        {
            // Apply sort
            if (!string.IsNullOrEmpty(specParams.Sort))
            {
                switch (specParams.Sort)
                {
                    case "priceAsc":
                        OrderBy = p => p.Price;
                        break;
                    case "priceDesc":
                        OrderByDescending = p => p.Price;
                        break;
                    default:
                        OrderBy = p => p.Name;
                        break;
                }
            }
            else
            {
                OrderBy = p => p.Name;
            }
            ApplyPaging(specParams.PageIndex, specParams.PageSize);
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}