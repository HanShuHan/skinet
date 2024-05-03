namespace Core.Entities.OrderAggregate;

public class DeliveryMethod : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string ApproximatedDeliveryDays { get; set; }
    public decimal Price { get; set; }

    public IList<Order> Orders { get; set; } = [];

}