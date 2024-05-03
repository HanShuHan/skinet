using System.Net;
using Microsoft.AspNetCore.Identity;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public IEnumerable<object> Errors { get; }

        public ApiValidationErrorResponse(string errorMessage) : base(HttpStatusCode.BadRequest)
        {
            Errors = new List<string>() { errorMessage };
        }
        
        public ApiValidationErrorResponse(string errorMessage, string detailMessage) : base(HttpStatusCode.BadRequest, null, detailMessage)
        {
            Errors = new List<string>() { errorMessage };
        }

        public ApiValidationErrorResponse(IEnumerable<string> errorMessages) : base(HttpStatusCode.BadRequest)
        {
            Errors = errorMessages;
        }

        public ApiValidationErrorResponse(IEnumerable<IdentityError> errors) : base(HttpStatusCode.BadRequest)
        {
            Errors = errors;
        }
    }
}