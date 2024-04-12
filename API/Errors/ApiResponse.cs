using System.Net;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(HttpStatusCode httpStatusCode)
        {
            StatusCode = (int)httpStatusCode;
            Message = httpStatusCode.ToString();
        }

        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageFrom(StatusCode);
        }

        private string GetDefaultMessageFrom(int statusCode)
        {
            HttpStatusCode httpStatusCode = (HttpStatusCode) Enum.Parse(typeof(HttpStatusCode), statusCode.ToString());
            
            return  httpStatusCode.ToString();
        }
    }
}