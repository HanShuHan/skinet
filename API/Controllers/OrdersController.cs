using System.Net;
using System.Security.Claims;
using API.Dtos.Identity;
using API.Dtos.Store.Order;
using API.Errors;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrdersController : UserApiController
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<OrderToReturnDto>> CreateOrder(OrderDto orderDto)
    {
        // Params validation
        var deliveryMethod = await _orderService.GetDeliveryMethodByIdAsync(orderDto.DeliveryMethodId);
        if (deliveryMethod == null)
        {
            return BadRequest(new ApiValidationErrorResponse("The delivery method is invalid"));
        }
        // validates the basket id

        var userId = HttpContext.User.FindFirstValue(ClaimTypes.Email);
        var order = await _orderService.CreateOrderAsync(userId, orderDto.SimpleBasketId,
            _mapper.Map<AddressDto, ShippingAddress>(orderDto.AddressDto),
            orderDto.DeliveryMethodId);

        return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersByUserId()
    {
        var userId = GetCurrentUserId(HttpContext);
        var orders = await _orderService.GetOrdersByUserIdAsync(userId);

        return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
    }

    [HttpGet("{orderId}")]
    public async Task<ActionResult<OrderToReturnDto>> GetOrderByUserIdAnOrderId(int orderId)
    {
        var userId = GetCurrentUserId(HttpContext);
        var order = await _orderService.GetOrderByIdAndUserIdAsync(orderId, userId);

        if (order == null)
        {
            return NotFound(new ApiResponse(HttpStatusCode.NotFound, null, "The order is not found"));
        }

        return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
    }

    [AllowAnonymous]
    [HttpGet("deliveryMethods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethodToReturnDto>>> GetDeliveryMethods()
    {
        var deliveryMethods = await _orderService.GetDeliveryMethodsAsync();

        return Ok(_mapper
            .Map<IReadOnlyList<DeliveryMethod>, IReadOnlyList<DeliveryMethodToReturnDto>>(deliveryMethods));
    }
}