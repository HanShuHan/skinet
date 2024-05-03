using Core.Entities.BasketAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.BasketAggregate;

public class BasketConfiguration : IEntityTypeConfiguration<Basket>
{
    public void Configure(EntityTypeBuilder<Basket> builder)
    {
        builder.Property(dbCustomerBasket => dbCustomerBasket.AppUserId)
            .IsRequired();
    }
}