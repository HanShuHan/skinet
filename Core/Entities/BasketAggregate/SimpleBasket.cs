namespace Core.Entities.BasketAggregate;

public class SimpleBasket
{
    public string Id { get; set; }

    public IReadOnlyList<SimpleBasketItem> Items { get; set; } = [];

    public SimpleBasket()
    {
    }

    public SimpleBasket(string id)
    {
        Id = id;
    }
}