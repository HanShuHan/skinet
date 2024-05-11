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

    public async Task<SimpleBasket> CreateOrUpdatePaymentIntent(string basketId, AppUser user = null)
    {
        var basket = await _basketRepository.GetByIdAsync(basketId);
        if (basket == null)
        {
            return null;
        }

        // Stripe config key setting
        StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

        // Amount
        var amount = 0L;
        // total
        foreach (var item in basket.Items)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.ProductId);
            amount += item.Quantity * (long)(product.Price * 100);
        }

        // First creation
        if (basket.PaymentIntentId == null)
        {
            // Options
            // base
            var options = new PaymentIntentCreateOptions
            {
                Currency = "usd",
                Amount = amount,
                PaymentMethodTypes = ["card"] 
            };

            // Create payment intent
            var paymentIntent = await new PaymentIntentService().CreateAsync(options);
            // update the basket
            basket.PaymentIntentId = paymentIntent.Id;
            basket.ClientSecret = paymentIntent.ClientSecret;
            await _basketRepository.UpdateAsync(basket);
        }
        // Updating or ready to checkout
        else
        {
            // Amount
            // shipping fee
            if (basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod =
                    await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(basket.DeliveryMethodId.Value);
                amount += (long)(deliveryMethod.Price * 100);
            }

            // Options
            // base
            var options = new PaymentIntentUpdateOptions()
            {
                Amount = amount,
            };
            // user details
            if (user != null)
            {
                options.Customer = user.DisplayName ?? user.UserName;
                options.ReceiptEmail = user.Email;
                if (!user.PhoneNumber.IsNullOrEmpty())
                {
                    options.Shipping.Phone = user.PhoneNumber;
                }
            }

            // shipping address
            var shippingAddress = basket.ShippingAddress;
            if (shippingAddress != null)
            {
                options.Shipping.Address = new AddressOptions
                {
                    Line1 = shippingAddress.Street,
                    City = shippingAddress.City,
                    State = shippingAddress.State,
                    Country = shippingAddress.Country,
                    PostalCode = shippingAddress.ZipCode,
                };
            }

            // Update the payment intent
            await new PaymentIntentService().UpdateAsync(basket.PaymentIntentId, options);
        }

        // return the basket
        return basket;
    }
}