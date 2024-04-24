using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class UserManagerExtension
{
    public static async Task<AppUser> FindUserByClaimsPrincipalAsync(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        return await userManager.Users.Include(u => u.Address)
            .SingleAsync(u => u.Email == user.FindFirstValue(ClaimTypes.Email));
    }
}