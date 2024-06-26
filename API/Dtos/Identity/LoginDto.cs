using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Identity;

public class LoginDto
{
    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }
}