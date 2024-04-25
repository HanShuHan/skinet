namespace API.Helpers;

public class ValidationResult
{
    public readonly bool Success;
    public readonly IReadOnlyList<string> ErrorMessages;

    public ValidationResult(bool success)
    {
        Success = success;
    }    
    
    public ValidationResult(bool success, IReadOnlyList<string> errorMessages)
    {
        Success = success;
        ErrorMessages = errorMessages;
    }
}