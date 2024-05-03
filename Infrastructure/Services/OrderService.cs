using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Order;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly IUnitOfWork<StoreDbContext> _unitOfWork;
    private readonly IBasketRepository _basketRepository;
    private readonly IProductService _productService;

    public OrderService(IUnitOfWork<StoreDbContext> unitOfWork, IBasketRepository basketRepository,
        IProductService productService)
    {
        _unitOfWork = unitOfWork;
        _unitOfWork.Repository<Order>();
        _unitOfWork.Repository<DeliveryMethod>();

        _basketRepository = basketRepository;
        _productService = productService;
    }

    public async Task<Order> CreateOrderAsync(string userId, string simpleBasketId, ShippingAddress shippingAddress,
        int deliveryMethodId)
    {
        // Create order items
        var orderItems = new List<OrderItem>();
        var basket = await _basketRepository.GetByIdAsync(simpleBasketId);
        foreach (var basketItem in basket.Items)
        {
            var product = await _productService.GetProductByIdWithBrandAndTypeAsync(basketItem.ProductId);
            var orderItem = new OrderItem(product.Id, product.Name, product.Description, product.Price, product.PictureUrl,
                product.ProductBrand.Name, product.ProductType.Name, basketItem.Quantity);
            orderItems.Add(orderItem);
        }

        var order = new Order(userId, orderItems, shippingAddress, deliveryMethodId);
        _unitOfWork.Repository<Order>().Add(order);

        var changes = await _unitOfWork.Complete();
        if (changes < 1)
        {
            throw new DbUpdateException("An error occurred while creating the new order to the database");
        }

        await _basketRepository.DeleteByIdAsync(simpleBasketId);
        return order;
    }

    public async Task<IReadOnlyList<Order>> GetOrdersByUserIdAsync(string userId)
    {
        var spec = new OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc(userId);
        return await _unitOfWork.Repository<Order>().ListWithSpecsAsync(spec);
    }

    public async Task<Order> GetOrderByIdAndUserIdAsync(int orderId, string userId)
    {
        var spec = new OrderCriteriaSpecWithItemsAndShippingAddressAndDeliveryMethodInDateDesc(orderId, userId);
        return await _unitOfWork.Repository<Order>().GetWithSpecsAsync(spec);
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<DeliveryMethod> GetDeliveryMethodByIdAsync(int id)
    {
        return await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
    }
}