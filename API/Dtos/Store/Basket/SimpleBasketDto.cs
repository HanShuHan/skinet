using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Store.Basket;

public class SimpleBasketDto
{
    [Required] public string Id { get; set; }

    [Required] public IReadOnlyList<SimpleBasketItemDto> Items { get; set; } = [];
}