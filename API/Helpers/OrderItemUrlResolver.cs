using API.Dtos.Store.Order;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Microsoft.IdentityModel.Tokens;

namespace API.Helpers;

public class OrderItemUrlResolver: IValueResolver<OrderItem, OrderItemToReturnDto, string>
{
    private readonly IConfiguration _config;

    public OrderItemUrlResolver(IConfiguration config)
    {
        _config = config;
    }

    public string Resolve(OrderItem source, OrderItemToReturnDto destination, string destMember, ResolutionContext context)
    {
        if (!source.PictureUrl.IsNullOrEmpty())
        {
            return _config["ApiUrl"] + source.PictureUrl;
        }
        return null;
    }
}