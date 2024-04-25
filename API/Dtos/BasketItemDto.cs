using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class BasketItemDto
{
    [Required] public int Id { get; set; }

    [Required] public string ProductName { get; set; }

    [Range(0.0, double.MaxValue, MinimumIsExclusive = true,
        ErrorMessage = "The price must be greater than 0.0 and no more than 1.7976931348623157E+308D")]
    public decimal Price { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "The quantity must be at least 1 and no more than 2147483647")]
    public int Quantity { get; set; }

    [Required] public string PictureUrl { get; set; }

    [Required] public string Brand { get; set; }

    [Required] public string Type { get; set; }
}