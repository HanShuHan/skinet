namespace Core.Entities.OrderAggregate;

public class ShippingAddress : BaseEntity
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    
    public Order Order { get; set; }
    public int OrderId { get; set; }
}