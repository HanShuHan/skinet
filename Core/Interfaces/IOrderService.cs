using Core.Entities.OrderAggregate;

namespace Core.Interfaces;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(string userId, string simpleBasketId, ShippingAddress shippingAddress,
        int deliveryMethodId);

    Task<IReadOnlyList<Order>> GetOrdersByUserIdAsync(string userId);
    
    Task<Order> GetOrderByIdAndUserIdAsync(int orderId, string userId);
    
    Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    
    Task<DeliveryMethod> GetDeliveryMethodByIdAsync(int id);
}