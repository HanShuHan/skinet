using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.OrderAggregate;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(order => order.AppUserId)
            .IsRequired();

        builder.HasMany(order => order.OrderItems)
            .WithOne(orderItem => orderItem.Order)
            .HasForeignKey(orderItem => orderItem.OrderId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(order => order.ShippingAddress)
            .WithOne(shippingAddress => shippingAddress.Order)
            .HasForeignKey<ShippingAddress>(shippingAddress => shippingAddress.OrderId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(order => order.OrderStatus)
            .HasConversion(orderStatus => orderStatus.ToString(),
                orderStatusString => Enum.Parse<OrderStatus>(orderStatusString))
            .IsRequired();

        builder.HasOne(order => order.DeliveryMethod)
            .WithMany(deliveryMethod => deliveryMethod.Orders)
            .HasForeignKey(order => order.DeliveryMethodId)
            .IsRequired()
            .OnDelete(DeleteBehavior.ClientNoAction);

        builder.Property(order => order.OrderDate)
            .IsRequired();
    }
}