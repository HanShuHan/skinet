using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Seed;

public static class AppIdentityDbContextSeed
{
    public static async Task SeedAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new AppUser
            {
                UserName = "bob@gmail.com",
                Email = "bob@gmail.com",
                DisplayName = "Bob",
                PhoneNumber = "123456789",
                Address = new Address
                {
                    Street = "10 street",
                    City = "New York",
                    State = "NY",
                    ZipCode = "K2E 6P5",
                    Country = "USA"
                }
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}