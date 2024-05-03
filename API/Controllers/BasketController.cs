using API.Dtos.Store.Basket;
using AutoMapper;
using Core.Entities.BasketAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;
    private readonly IMapper _mapper;
    private readonly IProductService _productService;

    public BasketController(IBasketRepository basketRepository, IMapper mapper, IProductService productService)
    {
        _basketRepository = basketRepository;
        _mapper = mapper;
        _productService = productService;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<object>> GetBasket(string id)
    {
        var data = await _basketRepository.GetByIdAsync(id);

        if (data == null)
        {
            return Ok(new SimpleBasket(id));
        }

        // var productIds = data.Items.Select(item => item.ProductId).ToList();
        // var products = await _productService.GetProductsByIdsAsync(productIds);
        //
        // var basket = new List<BasketItemDto>();
        // for (int i = 0; i < productIds.Count; i++)
        // {
        //     basket.Add(new BasketItemDto(products[i], data.Items[i].Quantity));
        // }
        // return Ok(basket);
        
        return Ok(data);
    }

    [HttpPost]
    public async Task<ActionResult<SimpleBasket>> UpdateBasket(SimpleBasketDto basketDto)
    {
        var data = await _basketRepository.UpdateAsync(_mapper.Map<SimpleBasketDto, SimpleBasket>(basketDto));
        // throw?
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