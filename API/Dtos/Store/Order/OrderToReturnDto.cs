using API.Dtos.Identity;

namespace API.Dtos.Store.Order;

public class OrderToReturnDto
{
    public int Id { get; set; }

    public IReadOnlyList<OrderItemToReturnDto> OrderItems { get; set; }

    public AddressToReturnDto ShippingAddress { get; set; }

    public string OrderStatus { get; set; }

    public string DeliveryMethod { get; set; }
    public decimal DeliveryFee { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public decimal Subtotal { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
}