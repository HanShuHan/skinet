using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.OrderAggregate;

public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        // Attributes
        builder.Property(orderItem => orderItem.ProductId)
            .IsRequired();
            
        builder.Property(orderItem => orderItem.ProductName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(orderItem => orderItem.Description)
            .HasMaxLength(255);

        builder.Property(orderItem => orderItem.Price)
            .HasColumnType("decimal(18, 2)")
            .IsRequired();

        builder.Property(orderItem => orderItem.PictureUrl)
            .IsRequired()
            .HasMaxLength(255);
        
        builder.Property(orderItem => orderItem.Brand)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(orderItem => orderItem.Type)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(orderItem => orderItem.Quantity)
            .IsRequired();

        builder.Navigation(orderItem => orderItem.Order)
            .IsRequired();
    }
}