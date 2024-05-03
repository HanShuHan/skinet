using System.Security.Claims;

namespace API.Controllers;

public class UserApiController: BaseApiController
{
    protected string GetCurrentUserId(HttpContext httpContext)
    {
        return httpContext.User.FindFirstValue(ClaimTypes.Email);
    } 
}