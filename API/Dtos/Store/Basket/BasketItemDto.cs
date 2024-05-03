namespace API.Dtos.Store.Basket;

public class BasketItemDto
{
    public Core.Entities.ProductAggregate.Product Item { get; set; }
    
    public int Quantity { get; set; }

    public BasketItemDto(Core.Entities.ProductAggregate.Product item, int quantity)
    {
        Item = item;
        Quantity = quantity;
    }
}