using Core.Entities.Identity;

namespace Core.Entities.BasketAggregate;

public class SimpleBasket
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public IReadOnlyList<SimpleBasketItem> Items { get; set; } = [];
    
    // Payments needed
    // public DeliveryMethod DeliveryMethod { get; set; }
    public int? DeliveryMethodId { get; set; } 
    public Address ShippingAddress { get; set; }
    
    // for payments
    public string PaymentIntentId { get; set; }
    public string ClientSecret { get; set; }

    public SimpleBasket()
    {
    }

    public SimpleBasket(string id)
    {
        Id = id;
    }
}