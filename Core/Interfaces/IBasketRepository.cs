using Core.Entities;

namespace Infrastructure.Data.Repositories;

public interface IBasketRepository
{
     Task<CustomerBasket> GetByIdAsync(string id);
     Task<CustomerBasket> UpdateAsync(CustomerBasket basket);
     Task<bool> DeleteByIdAsync(string id);
}