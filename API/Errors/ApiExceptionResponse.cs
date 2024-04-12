using System.Net;

namespace API.Errors
{
    public class ApiExceptionResponse : ApiResponse
    {
        public string Detail { get; set; }

        public ApiExceptionResponse(HttpStatusCode httpStatusCode, string detail = null) : base(httpStatusCode)
        {
            Detail = detail;
        }

        public ApiExceptionResponse(int statusCode, string message = null, string detail = null) : base(statusCode, message)
        {
            Detail = detail;
        }
    }
}