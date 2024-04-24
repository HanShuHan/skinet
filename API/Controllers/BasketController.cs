using System.Net;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;

    public BasketController(IBasketRepository basketRepository)
    {
        _basketRepository = basketRepository;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<CustomerBasket>> GetBasket(string id)
    {
        var data = await _basketRepository.GetByIdAsync(id);

        return Ok(data ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
    {
        var data = await _basketRepository.UpdateAsync(basket);

        return Ok(data);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<bool>> DeleteBasket(string id)
    {
        var success = await _basketRepository.DeleteByIdAsync(id);

        return Ok(success);
    }
}