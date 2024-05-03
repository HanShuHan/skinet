using Core.Entities.BasketAggregate;

namespace Core.Interfaces;

public interface IBasketRepository
{
     Task<SimpleBasket> GetByIdAsync(string id);
     Task<SimpleBasket> UpdateAsync(SimpleBasket basket);
     Task<bool> DeleteByIdAsync(string id);
}