namespace Core.Entities.BasketAggregate;

public class Basket : BaseEntity
{
    public IList<BasketItem> BasketItems { get; set;} = [];

    public string AppUserId { get; set; }
}