using Core.Entities.BasketAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.BasketAggregate;

public class BasketItemConfiguration : IEntityTypeConfiguration<BasketItem>
{
    public void Configure(EntityTypeBuilder<BasketItem> builder)
    {
        // Attributes
        builder.HasOne(basketItem => basketItem.Product)
            .WithMany()
            .HasForeignKey(basketItem => basketItem.ProductId)
            .IsRequired();

        builder.Property(basketItem => basketItem.Quantity)
            .IsRequired();
        
        // FK
        builder.HasOne(basketItem => basketItem.Basket)
            .WithMany(basket => basket.BasketItems)
            .HasForeignKey(basketItem => basketItem.BasketId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}