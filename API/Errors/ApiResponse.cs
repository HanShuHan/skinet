using System.Net;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string DetailMessage { get; set; }

        public ApiResponse(HttpStatusCode httpStatusCode)
        {
            StatusCode = (int)httpStatusCode;
            Message = httpStatusCode.ToString();
        }

        public ApiResponse(HttpStatusCode httpStatusCode, string message = null, string detailMessage = null)
        {
            StatusCode = (int)httpStatusCode;
            Message = message ?? GetDefaultMessageFrom(StatusCode);
            if (detailMessage != null)
            {
                DetailMessage = detailMessage;
            }
        }

        public ApiResponse(int statusCode, string message = null, string detailMessage = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageFrom(StatusCode);
            if (detailMessage != null)
            {
                DetailMessage = detailMessage;
            }
        }

        private string GetDefaultMessageFrom(int statusCode)
        {
            HttpStatusCode httpStatusCode = (HttpStatusCode)Enum.Parse(typeof(HttpStatusCode), statusCode.ToString());

            return httpStatusCode.ToString();
        }
    }
}