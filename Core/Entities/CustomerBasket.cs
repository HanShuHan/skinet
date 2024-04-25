using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class CustomerBasket
{
    public string Id { get; set; }
    public IReadOnlyList<BasketItem> Items { get; set; } = new List<BasketItem>();

    public CustomerBasket( )
    {
    }

    public CustomerBasket(string id)
    {
        Id = id;
    }
}