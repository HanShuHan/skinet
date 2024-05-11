using API.Dtos.Identity;
using API.Dtos.Store.Basket;
using API.Dtos.Store.Order;
using API.Dtos.Store.Product;
using AutoMapper;
using Core.Entities.BasketAggregate;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using Core.Entities.ProductAggregate;

namespace API.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            // CreateMap<Product, ProductToReturnDto>()
            //     .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            //     .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            //     .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
            
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<UserAddress, AddressDto>().ReverseMap();
            
            // Basket
            CreateMap<SimpleBasketDto, SimpleBasket>().ReverseMap();
            CreateMap<SimpleBasketItemDto, SimpleBasketItem>().ReverseMap();
            CreateMap<AddressDto, Address>();

            // Order aggregate
            CreateMap<AddressDto, ShippingAddress>();
            CreateMap<OrderItem, OrderItemToReturnDto>()
                .ForMember(dto => dto.PictureUrl, opt => opt.MapFrom<OrderItemUrlResolver>());
            CreateMap<ShippingAddress, AddressToReturnDto>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(dto => dto.OrderStatus, opt => opt.MapFrom(order => order.OrderStatus.ToString()))
                .ForMember(dto => dto.DeliveryMethod, opt => opt.MapFrom(order => order.DeliveryMethod.Name))
                .ForMember(dto => dto.DeliveryFee, opt => opt.MapFrom(order => order.DeliveryMethod.Price));
            CreateMap<DeliveryMethod, DeliveryMethodToReturnDto>();
        }
    }
}