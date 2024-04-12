using System.Net;
using System.Net.Mime;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Infrastructure.Data.Repositories;
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

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyList<ProductToReturnDto>), StatusCodes.Status200OK, MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var products = await _productService.GetProductsWithBrandsAndTypesAsync();
            var productDtos = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProductToReturnDto), StatusCodes.Status200OK, MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound, MediaTypeNames.Application.Json)]
        public async Task<ActionResult<ProductToReturnDto>> getProducts(int id)
        {
            var product = await _productService.GetProductByIdWithBrandAndTypeAsync(id);
            var dto = _mapper.Map<Product, ProductToReturnDto>(product);

            if (dto != null)
            {
                return Ok(dto);
            }
            else
            {
                var response = new ApiResponse(HttpStatusCode.NotFound);

                return NotFound(response);
            }
        }

        [HttpGet("brands")]
        [ProducesResponseType(typeof(IReadOnlyList<ProductBrand>), StatusCodes.Status200OK, MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var brands = await _productService.GetBrandsAsync();

            return Ok(brands);
        }

        [HttpGet("types")]
        [ProducesResponseType(typeof(IReadOnlyList<ProductType>), StatusCodes.Status200OK, MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var types = await _productService.GetTypesAsync();

            return Ok(types);
        }
    }
}