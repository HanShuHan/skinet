using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.OrderAggregate;

public class ShippingAddressConfiguration: IEntityTypeConfiguration<ShippingAddress>
{
    public void Configure(EntityTypeBuilder<ShippingAddress> builder)
    {
        builder.Property(address => address.Street)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(address => address.City)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(address => address.State)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(address => address.ZipCode)
            .IsRequired()
            .HasMaxLength(7);
        
        builder.Property(address => address.Country)
            .IsRequired()
            .HasMaxLength(50);
        
        // FK
        builder.Navigation(shippingAddress => shippingAddress.Order)
            .IsRequired();
    }
}