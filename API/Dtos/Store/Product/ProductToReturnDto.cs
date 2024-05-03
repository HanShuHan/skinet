namespace API.Dtos.Store.Product
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public int ProductBrandId { get; set; }
        public int ProductTypeId { get; set; }

        public ProductToReturnDto()
        {
        }

        public ProductToReturnDto(Core.Entities.ProductAggregate.Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
            PictureUrl = product.PictureUrl;
            ProductBrandId = product.ProductBrandId;
            ProductTypeId = product.ProductTypeId;
        }
    }
}