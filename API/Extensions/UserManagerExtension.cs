using System.Security.Claims;
using API.Dtos.Identity;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class UserManagerExtension
{
    public static async Task<AppUser> FindUserByClaimsPrincipalEmailAsync(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        return await userManager.Users.Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.Email == user.FindFirstValue(ClaimTypes.Email));
    }
    
    public static async Task<AppUser> FindUserByEmailAsync(this UserManager<AppUser> userManager,
        string email)
    {
        return await userManager.Users.Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.Email == email);
    }
}