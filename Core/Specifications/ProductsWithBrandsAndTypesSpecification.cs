using Core.Entities.ProductAggregate;

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

        public ProductsWithBrandsAndTypesSpecification(ProductsSpecificationParams specificationParams)
            : base(p =>
                (specificationParams.BrandId < 1 || p.ProductBrandId == specificationParams.BrandId)
                && (specificationParams.TypeId < 1 || p.ProductTypeId == specificationParams.TypeId)
                && (string.IsNullOrEmpty(specificationParams.Search) ||
                    p.Name.ToLower().Contains(specificationParams.Search.ToLower()))
            )
        {
            // Apply sort
            if (!string.IsNullOrEmpty(specificationParams.Sort))
            {
                switch (specificationParams.Sort)
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

            ApplyPaging(specificationParams.PageIndex, specificationParams.PageSize);
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}