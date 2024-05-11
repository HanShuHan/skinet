using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppIdentityDbContext : IdentityDbContext<AppUser>
{
    public DbSet<UserAddress> Addresses { get; set; }

    public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        CreateAppUser(builder);
        CreateAddress(builder);
    }

    private void CreateAppUser(ModelBuilder builder)
    {
        builder.Entity<AppUser>(appUser =>
            {
                appUser.Property(u => u.DisplayName)
                    .HasMaxLength(50);
            }
        );
    }

    private void CreateAddress(ModelBuilder builder)
    {
        builder.Entity<UserAddress>(address =>
        {
            address.Property(a => a.Street)
                .IsRequired()
                .HasMaxLength(50);

            address.Property(a => a.City)
                .IsRequired()
                .HasMaxLength(50);

            address.Property(a => a.State)
                .IsRequired()
                .HasMaxLength(50);

            address.Property(a => a.ZipCode)
                .IsRequired()
                .HasMaxLength(7);

            address.Property(a => a.Country)
                .IsRequired()
                .HasMaxLength(50);

            // FK
            address.HasOne(a => a.AppUser)
                .WithOne(u => u.UserAddress)
                .HasForeignKey<UserAddress>(a => a.AppUserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}