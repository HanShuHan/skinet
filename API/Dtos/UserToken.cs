namespace API.Dtos;

public class UserToken
{
    public string Email { get; set; }
    public string Token { get; set; }

    public UserToken(string email, string token)
    {
        Email = email;
        Token = token;
    }
}