using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public ActionResult<ApiResponse> Error(int code)
        {
            var response = new ApiResponse(code);

            return new ObjectResult(response);
        }
    }
}