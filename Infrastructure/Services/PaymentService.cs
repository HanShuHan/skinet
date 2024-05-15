using Core;
using Core.Entities.BasketAggregate;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using Product = Core.Entities.ProductAggregate.Product;

namespace Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly IConfiguration _config;
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork<StoreDbContext> _unitOfWork;

    public PaymentService(IConfiguration config, IBasketRepository basketRepository,
        IUnitOfWork<StoreDbContext> unitOfWork)
    {
        _config = config;
        _basketRepository = basketRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<SimpleBasket> CreateOrUpdatePaymentIntent(string basketId, AppUser user)
    {
        var basket = await _basketRepository.GetByIdAsync(basketId);
        if (basket == null)
        {
            return null;
        }

        StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

        var amount = await CalculateAmount(basket);

        if (basket.PaymentIntentId.IsNullOrEmpty())
        {
            var options = new PaymentIntentCreateOptions
            {
                Currency = "usd",
                Amount = amount,
                PaymentMethodTypes = ["card"],
                ReceiptEmail = user.Email,
                Shipping = new ChargeShippingOptions
                {
                    Name = user!.DisplayName ?? user.UserName,
                    Address = new AddressOptions
                    {
                        Line1 = basket.ShippingAddress.Street,
                        City = basket.ShippingAddress.City,
                        State = basket.ShippingAddress.State,
                        Country = basket.ShippingAddress.Country,
                        PostalCode = basket.ShippingAddress.ZipCode,
                    },
                    Phone = !user.PhoneNumber.IsNullOrEmpty() ? user.PhoneNumber : null
                }
            };

            // Create payment intent
            var paymentIntent = await new PaymentIntentService().CreateAsync(options);

            // update the basket
            basket.PaymentIntentId = paymentIntent.Id;
            basket.ClientSecret = paymentIntent.ClientSecret;
            await _basketRepository.UpdateAsync(basket);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = amount,
                ReceiptEmail = user.Email,
                Shipping = new ChargeShippingOptions
                {
                    Name = user!.DisplayName ?? user.UserName,
                    Address = new AddressOptions
                    {
                        Line1 = basket.ShippingAddress.Street,
                        City = basket.ShippingAddress.City,
                        State = basket.ShippingAddress.State,
                        Country = basket.ShippingAddress.Country,
                        PostalCode = basket.ShippingAddress.ZipCode,
                    },
                    Phone = !user.PhoneNumber.IsNullOrEmpty() ? user.PhoneNumber : null
                }
            };

            // Update the payment intent
            await new PaymentIntentService().UpdateAsync(basket.PaymentIntentId, options);
        }

        return basket;
    }

    private async Task<long> CalculateAmount(SimpleBasket basket)
    {
        // Amount
        var amount = 0L;
        // total
        foreach (var item in basket.Items)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
            amount += item.Quantity * (long)(product.Price * 100);
        }

        // tax
        amount += (long)(amount * IConstants.TaxRate);
        // shipping fee
        if (basket.DeliveryMethodId.HasValue)
        {
            var deliveryMethod =
                await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(basket.DeliveryMethodId.Value);
            amount += (long)(deliveryMethod.Price * 100);
        }

        return amount;
    }
}