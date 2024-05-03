using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.OrderAggregate;

public class DeliveryMethodConfiguration : IEntityTypeConfiguration<DeliveryMethod>
{
    public void Configure(EntityTypeBuilder<DeliveryMethod> builder)
    {
        builder.Property(deliveryMethod => deliveryMethod.Name)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(deliveryMethod => deliveryMethod.Description)
            .HasMaxLength(100);     
        
        builder.Property(deliveryMethod => deliveryMethod.ApproximatedDeliveryDays)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(deliveryMethod => deliveryMethod.Price)
            .HasColumnType("decimal(18, 2)")
            .IsRequired(); 
    }
}