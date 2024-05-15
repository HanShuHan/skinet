namespace Core.Entities.Identity;

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }

    public bool Equals(Address other)
    {
        return Street == other.Street
               && City == other.City
               && State == other.State
               && ZipCode == other.ZipCode
               && Country == other.Country;
    }

}