using System.ComponentModel.DataAnnotations;
using API.Dtos.Identity;

namespace API.Dtos.Store.Basket;

public class SimpleBasketDto
{
    [Required] public string Id { get; set; }
    
    [Required] public IReadOnlyList<SimpleBasketItemDto> Items { get; set; } = [];
    
    public int? DeliveryMethodId { get; set; }
    
    public AddressDto ShippingAddress { get; set; }
    
    public string PaymentIntentId { get; set; }
    
    public string ClientSecret { get; set; }
}