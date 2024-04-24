using System.Net;
using Microsoft.AspNetCore.Identity;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {

        public IEnumerable<object> Errors { get; }

        public ApiValidationErrorResponse(IEnumerable<string> errors) : base(HttpStatusCode.BadRequest)
        {
            Errors = errors;
        }
        
        public ApiValidationErrorResponse(IEnumerable<IdentityError> errors) : base(HttpStatusCode.BadRequest)
        {
            Errors = errors;
        }
    }
}