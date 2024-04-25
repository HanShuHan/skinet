using API.Dtos;
using AutoMapper;
using Core.Entities;
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
    public async Task<ActionResult<CustomerBasket>> GetBasket(string id)
    {
        var data = await _basketRepository.GetByIdAsync(id);

        return Ok(data ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basketDto)
    {
        var data = await _basketRepository.UpdateAsync(_mapper.Map<CustomerBasketDto, CustomerBasket>(basketDto));

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