using System.ComponentModel.DataAnnotations;
using API.Dtos.Identity;

namespace API.Dtos.Store.Order;

public class OrderDto
{
    [Required]
    public string SimpleBasketId { get; set;}
    
    [Required]
    public AddressDto AddressDto { get; set;}
    
    [Required]
    public int DeliveryMethodId { get; set;}

    public OrderDto()
    {
    }

    public OrderDto(string simpleBasketId, AddressDto addressDto, int deliveryMethodId)
    {
        SimpleBasketId = simpleBasketId;
        AddressDto = addressDto;
        DeliveryMethodId = deliveryMethodId;
    }
}