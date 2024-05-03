namespace Core.Entities.ProductAggregate
{
    public class ProductBrand : BaseEntity
    {
        public string Name { get; set; }

        public ISet<Product> Products { get; set; } = new HashSet<Product>();
    }
}