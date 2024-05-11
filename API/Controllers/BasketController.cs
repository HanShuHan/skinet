using System.Net;
using API.Dtos.Store.Basket;
using API.Errors;
using AutoMapper;
using Core.Entities.BasketAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;
    private readonly IMapper _mapper;

    public BasketController(IBasketRepository basketRepository, IMapper mapper)
    {
        _basketRepository = basketRepository;
        _mapper = mapper;
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<object>> GetBasket(string id)
    {
        var data = await _basketRepository.GetByIdAsync(id);

        return Ok(data);
    }

    [HttpGet]
    public async Task<ActionResult<SimpleBasket>> CreateBasket()
    {
        var basket = await _basketRepository.CreateNewBasketByTrialsAsync(10);

        return basket != null
            ? Ok(basket)
            : new ObjectResult(new ApiExceptionResponse(HttpStatusCode.InternalServerError, null,
                "An error occurred when creating a new basket"));
    }

    [HttpPost]
    public async Task<ActionResult<SimpleBasket>> UpdateBasket(SimpleBasketDto basketDto)
    {
        var data = await _basketRepository.UpdateAsync(_mapper.Map<SimpleBasketDto, SimpleBasket>(basketDto));

        return data != null
            ? Ok(data)
            : new ObjectResult(new ApiExceptionResponse(HttpStatusCode.InternalServerError, null,
                "An error occurred when updating the basket"));
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<bool>> DeleteBasket(string id)
    {
        var success = await _basketRepository.DeleteByIdAsync(id);

        return Ok(success);
    }
}