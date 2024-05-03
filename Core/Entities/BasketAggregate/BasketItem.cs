using Core.Entities.ProductAggregate;

namespace Core.Entities.BasketAggregate;

public class BasketItem : BaseEntity
{
    public Product Product { get; set; }
    public int ProductId { get; set; }
    
    public int Quantity { get; set; }

    public Basket Basket { get; set; }
    public int BasketId { get; set; }
}