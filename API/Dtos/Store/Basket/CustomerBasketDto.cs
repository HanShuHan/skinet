using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Store.Basket;

public class CustomerBasketDto
{
    [Required]
    public string Id { get; set; }
    
    [Required]
    public IReadOnlyList<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();
}