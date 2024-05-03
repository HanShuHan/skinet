using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.OrderAggregate;

public class Order : BaseEntity
{
    public string AppUserId { get; set; }

    [NotMapped] private IList<OrderItem> _orderItems;

    public IList<OrderItem> OrderItems
    {
        get => _orderItems;
        set
        {
            _orderItems = value;
            CalculateSubtotal();
            CalculateTax();
            CalculateTotal();
        }
    }

    public ShippingAddress ShippingAddress { get; set; }

    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

    [NotMapped] private DeliveryMethod _deliveryMethod;

    public DeliveryMethod DeliveryMethod
    {
        get => _deliveryMethod;
        set
        {
            _deliveryMethod = value;
            CalculateTotal();
        }
    }

    public int DeliveryMethodId { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    [NotMapped] public decimal Subtotal { get; set; }
    [NotMapped] public decimal Tax { get; set; }
    [NotMapped] public decimal Total { get; set; }

    public Order()
    {
    }

    public Order(string appUserId, IList<OrderItem> orderItems, ShippingAddress shippingAddress, int deliveryMethodId)
    {
        AppUserId = appUserId;
        OrderItems = orderItems;
        ShippingAddress = shippingAddress;
        DeliveryMethodId = deliveryMethodId;
    }

    private void CalculateSubtotal()
    {
        Subtotal = OrderItems.Sum(item => item.Subtotal);
    }

    private void CalculateTax()
    {
        Tax = Subtotal * IConstants.TaxRate;
    }

    private void CalculateTotal()
    {
        Total = Subtotal + Tax + (DeliveryMethod?.Price ?? 0);
    }
}