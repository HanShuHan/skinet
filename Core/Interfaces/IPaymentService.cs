using Core.Entities.BasketAggregate;
using Core.Entities.Identity;

namespace Core.Interfaces;

public interface IPaymentService
{
    Task<SimpleBasket> CreateOrUpdatePaymentIntent(string basketId, AppUser user);
}