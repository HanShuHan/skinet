using System.Net;
using System.Security.Claims;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var user = await _userManager.FindUserByClaimsPrincipalAsync(HttpContext.User);

        if (user != null)
        {
            return Ok(new UserDto(user.UserName, user.Email, user.DisplayName, user.PhoneNumber,
                _mapper.Map<Address, AddressDto>(user.Address)));
        }

        return NotFound(new ApiResponse(HttpStatusCode.NotFound));
    }

    [HttpGet("emailExists")]
    public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return Ok(user != null);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _userManager.FindUserByClaimsPrincipalAsync(HttpContext.User);

        if (user != null)
        {
            if (user.Address != null)
            {
                return Ok(_mapper.Map<Address, AddressDto>(user.Address));
            }

            return NoContent();
        }

        return NotFound(new ApiResponse(HttpStatusCode.NotFound));
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress([FromBody] AddressDto address)
    {
        var user = await _userManager.FindUserByClaimsPrincipalAsync(HttpContext.User);

        if (user == null) return NotFound(new ApiResponse(HttpStatusCode.NotFound));

        user.Address = _mapper.Map<AddressDto, Address>(address);
        var result = await _userManager.UpdateAsync(user);

        return result.Succeeded ? Ok(_mapper.Map<Address, AddressDto>(user.Address)) : new ObjectResult(new ApiResponse(HttpStatusCode.InternalServerError));
    }


    [HttpPost("register")]
    public async Task<ActionResult<UserToken>> Register(RegisterDto registerDto)
    {
        var user = new AppUser
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
            PhoneNumber = registerDto.PhoneNumber,
        };
        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new ApiValidationErrorResponse(result.Errors));
        }
        else
        {
            var token = new UserToken(user.Email, _tokenService.CreateToken(user));

            return Ok(token);
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserToken>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.UserName);

        if (user == null)
        {
            return Unauthorized(new ApiResponse(HttpStatusCode.Unauthorized));
        }
        else
        {
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new ApiResponse(HttpStatusCode.Unauthorized));
            }
            else
            {
                var token = new UserToken(user.Email, _tokenService.CreateToken(user));

                return Ok(token);
            }
        }
    }
}