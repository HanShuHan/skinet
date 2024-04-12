using System.Net;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public async Task<ActionResult> GetNotFound()
        {
            var product = await _context.Products.FindAsync(100);

            if (product == null)
            {
                var response = new ApiResponse(HttpStatusCode.NotFound);

                return NotFound(response);
            }
            else
            {
                return Ok(product);
            }
        }

        [HttpGet("servererror")]
        public async Task<ActionResult> GetServerError()
        {
            var product = await _context.Products.FindAsync(100);

            return Ok(product.ToString());
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            var response = new ApiResponse(HttpStatusCode.BadRequest);

            return BadRequest(response);
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequest(int id)
        {
            return Ok();
        }
    }
}