namespace Core.Entities.Identity;

public class UserAddress: BaseEntity
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}