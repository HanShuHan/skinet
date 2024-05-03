using Core.Entities.ProductAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config.ProductAggregate
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // Attributes
            builder.Property(product => product.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(product => product.Description)
                .HasMaxLength(255);

            builder.Property(product => product.Price)
                .HasColumnType("decimal(18, 2)")
                .IsRequired();

            builder.Property(product => product.PictureUrl)
                .IsRequired()
                .HasMaxLength(255);
            
            // Relationships
            builder.HasOne(product => product.ProductBrand)
                .WithMany(productType => productType.Products)
                .HasForeignKey(product => product.ProductBrandId)
                .IsRequired()
                .OnDelete(DeleteBehavior.ClientNoAction);

            builder.HasOne(product => product.ProductType)
                .WithMany(productType => productType.Products)
                .HasForeignKey(product => product.ProductTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.ClientNoAction);
        }
    }
}