using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Identity;

public class AddressDto
{
    [Required]
    [MaxLength(256)]
    public string Street { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string City { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string State { get; set; }
    
    [Required]
    [Length(minimumLength:7, maximumLength:7)]
    public string ZipCode { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Country { get; set; }

    
}