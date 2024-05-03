using System.Text.Json;
using Core.Entities.BasketAggregate;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data.Repositories;

public class BasketRepository : IBasketRepository
{
    private readonly IDatabase _database;

    public BasketRepository(IConnectionMultiplexer multiplexer)
    {
        _database = multiplexer.GetDatabase();
    }

    public async Task<SimpleBasket> GetByIdAsync(string id)
    {
        var basketStr = await _database.StringGetAsync(id);
        
        return basketStr.IsNullOrEmpty ? null : JsonSerializer.Deserialize<SimpleBasket>(basketStr);
    }

    public async Task<SimpleBasket> UpdateAsync(SimpleBasket basket)
    {
        var success =
            await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));
        
        return success ? await GetByIdAsync(basket.Id) : null;
    }

    public async Task<bool> DeleteByIdAsync(string id)
    {
        return await _database.KeyDeleteAsync(id);
    }
}