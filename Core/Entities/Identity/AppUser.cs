using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    
    public UserAddress UserAddress { get; set; }
    
    public IList<int> OrderIds { get; set; } = [];
}