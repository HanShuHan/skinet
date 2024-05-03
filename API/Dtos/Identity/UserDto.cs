namespace API.Dtos.Identity;

public class UserDto
{
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string PhoneNumber { get; set; }
    public AddressDto Address { get; set; }
    public string Token { get; set; }

    public UserDto(string email, string displayName, string phoneNumber, AddressDto address, string token)
    {
        Email = email;
        DisplayName = displayName;
        PhoneNumber = phoneNumber;
        Address = address;
        Token = token;
    }
}