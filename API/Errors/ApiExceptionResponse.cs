using System.Net;

namespace API.Errors
{
    public class ApiExceptionResponse : ApiResponse
    {
        public string Details { get; set; }

        public ApiExceptionResponse(HttpStatusCode httpStatusCode) : base(httpStatusCode)
        { }

        public ApiExceptionResponse(HttpStatusCode httpStatusCode, string message = null, string detailMessage = null, string details = null) : base(httpStatusCode, message, detailMessage)
        {
            Details = details;
        }

        public ApiExceptionResponse(int statusCode, string message = null, string detailMessage = null, string details = null) : base(statusCode, message, detailMessage)
        {
            Details = details;
        }
    }
}