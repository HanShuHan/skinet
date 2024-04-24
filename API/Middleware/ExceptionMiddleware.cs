using System.Net;
using System.Net.Mime;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, IHostEnvironment env, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                const HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                context.Response.ContentType = MediaTypeNames.Application.Json;
                context.Response.StatusCode = (int)statusCode;

                ApiExceptionResponse response = _env.IsDevelopment()
                    ? new ApiExceptionResponse((int)statusCode, statusCode.ToString(), ex.Message, ex.StackTrace)
                    : new ApiExceptionResponse(statusCode);

                var option = new JsonSerializerOptions(JsonSerializerDefaults.Web);
                var json = JsonSerializer.Serialize(response, option);
                await context.Response.WriteAsync(json);
            }
        }
    }
}