using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _conext;

        public ProductsController(StoreContext conext)
        {
            _conext = conext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> getProducts()
        {
            return await  _conext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> getProducts(int id)
        {
            return await _conext.Products.FindAsync(id);
        }
    }
}