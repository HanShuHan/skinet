namespace API.Dtos.Store.Basket.Product
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }

        public ProductToReturnDto()
        {
        }

        public ProductToReturnDto(Core.Entities.Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
            PictureUrl = product.PictureUrl;
            ProductType = product.ProductType.Name;
            ProductBrand = product.ProductBrand.Name;
        }
    }
}