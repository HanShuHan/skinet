using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Store.Basket;

public class SimpleBasketItemDto
{
    [Required] public int ProductId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "The quantity must be at least 1 and no more than 2147483647")]
    public int Quantity { get; set; }
}