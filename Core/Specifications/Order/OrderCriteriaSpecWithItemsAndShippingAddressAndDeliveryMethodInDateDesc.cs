using System.Linq.Expressions;

namespace Core.Specifications.Order;

public class
    OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc : BaseSpecification<
    Entities.OrderAggregate.Order>
{
    public OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc(
        Expression<Func<Entities.OrderAggregate.Order, bool>> criteria) : base(criteria)
    {
        AddIncludes([o => o.OrderItems, o => o.ShippingAddress, o => o.DeliveryMethod]);
        OrderByDescending = o => o.OrderDate;
    }

    public OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc(string userId) : this(o =>
        o.AppUserId == userId)
    {
    }

    public OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc(int orderId, string userId) : this(
        o => o.AppUserId == userId && o.Id == orderId)
    {
    }
}