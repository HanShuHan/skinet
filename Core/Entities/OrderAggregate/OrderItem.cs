using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.OrderAggregate;

public class OrderItem : BaseEntity
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string Description { get; set; }

    [NotMapped]
    private decimal _price;
    public decimal Price
    {
        get => _price;
        set
        {
            _price = value;
            CalculateSubtotal();
        }
    }

    public string PictureUrl { get; set; }

    public string Brand { get; set; }
    public string Type { get; set; }

    [NotMapped]
    private int _quantity;
    public int Quantity
    {
        get => _quantity;
        set
        {
            _quantity = value;
            CalculateSubtotal();
        }
    }

    public Order Order { get; set; }
    public int OrderId { get; set; }

    [NotMapped] public decimal Subtotal { get; set; }

    public OrderItem()
    {
    }

    public OrderItem(int productId, string productName, string description, decimal price, string pictureUrl, string brand,
        string type, int quantity)
    {
        ProductId = productId;
        ProductName = productName;
        Description = description;
        Price = price;
        PictureUrl = pictureUrl;
        Brand = brand;
        Type = type;
        Quantity = quantity;
    }

    private void CalculateSubtotal()
    {
        Subtotal = Price * Quantity;
    }
}