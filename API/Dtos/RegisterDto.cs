using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public class RegisterDto
{
    [Required] public string UserName { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    [Required]
    [RegularExpression(
        "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
        ErrorMessage =
            "The password requires at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and the length should be between 6-10 characters")]
    public string Password { get; set; }

    [Required] public string DisplayName { get; set; }

    [Required] [Phone] public string PhoneNumber { get; set; }
}