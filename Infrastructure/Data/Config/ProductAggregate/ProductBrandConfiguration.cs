using Core.Entities.ProductAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.ProductAggregate;

public class ProductBrandConfiguration: IEntityTypeConfiguration<ProductBrand>
{
    public void Configure(EntityTypeBuilder<ProductBrand> builder)
    {
        builder.Property(productBrand => productBrand.Name)
            .IsRequired()
            .HasMaxLength(50);
    }
}