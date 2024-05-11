using System.Net.Mime;
using API.Dtos.Store.Product;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core;
using Core.Entities.ProductAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _mapper = mapper;
            _productService = productService;
        }

        [HttpGet("taxRate")]
        [ProducesResponseType(typeof(decimal), StatusCodes.Status200OK, MediaTypeNames.Application.Json)]
        public ActionResult<decimal> GetTaxRate()
        {
            return Ok(IConstants.TaxRate);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<ProductToReturnDto>), StatusCodes.Status200OK,
            MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProductsWithSpecs(
            [FromQuery] ProductsSpecificationParams specificationParams)
        {
            var count = await _productService.CountAsync(specificationParams);
            var products = await _productService.GetProductsWithBrandsAndTypesAsync(specificationParams);
            var productDtos = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            var paging =
                new Pagination<ProductToReturnDto>(specificationParams.PageIndex, specificationParams.PageSize, count,
                    productDtos);

            return Ok(paging);
        }

        [HttpGet("{ids}")]
        [ProducesResponseType(typeof(Pagination<ProductToReturnDto>), StatusCodes.Status200OK,
            MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(ApiValidationErrorResponse), StatusCodes.Status400BadRequest,
            MediaTypeNames.Application.Json)]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProductsByIds([FromRoute] string ids)
        {
            try
            {
                var idList = ids.Split(',')
                    .Select(int.Parse)
                    .ToList();
                var products = await _productService.GetProductsByIdsAsync(idList);
                var paging = new Pagination<ProductToReturnDto>(ProductsSpecificationParams.DefaultPageIndex,
                    ProductsSpecificationParams.DefaultMaxPageSize, products.Count,
                    _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));

                return Ok(paging);
            }
            catch (FormatException e)
            {
                return BadRequest(new ApiValidationErrorResponse(e.ToString(), "Ids should be integer"));
            }
        }

        [HttpGet("brands")]
        [ProducesResponseType(typeof(IReadOnlyList<ProductBrand>), StatusCodes.Status200OK,
            MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var brands = await _productService.GetBrandsAsync();

            return Ok(brands);
        }

        [HttpGet("types")]
        [ProducesResponseType(typeof(IReadOnlyList<ProductType>), StatusCodes.Status200OK,
            MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var types = await _productService.GetTypesAsync();

            return Ok(types);
        }
    }
}