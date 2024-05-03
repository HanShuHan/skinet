using Core.Entities.ProductAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.ProductAggregate;

public class ProductTypeConfiguration: IEntityTypeConfiguration<ProductType>
{
    public void Configure(EntityTypeBuilder<ProductType> builder)
    {
        builder.Property(productType => productType.Name)
            .IsRequired()
            .HasMaxLength(50);
    }
}