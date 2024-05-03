using System.ComponentModel.DataAnnotations;

namespace API.Dtos.Identity;

public class AddressToReturnDto
{
    public string Street { get; set; }
    
    public string City { get; set; }
    
    public string State { get; set; }
    
    public string ZipCode { get; set; }
    
    public string Country { get; set; }
    
}