using Core.Entities.Identity;

namespace API.Dtos;

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string PhoneNumber { get; set; }
    public AddressDto Address { get; set; }

    public UserDto(string userName, string email, string displayName, string phoneNumber, AddressDto address)
    {
        UserName = userName;
        Email = email;
        DisplayName = displayName;
        PhoneNumber = phoneNumber;
        Address = address;
    }
}