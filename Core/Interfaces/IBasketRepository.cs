using Core.Entities;

namespace Core.Interfaces;

public interface IBasketRepository
{
     Task<CustomerBasket> GetByIdAsync(string id);
     Task<CustomerBasket> UpdateAsync(CustomerBasket basket);
     Task<bool> DeleteByIdAsync(string id);
}