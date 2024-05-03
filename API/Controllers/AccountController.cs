using System.Net;
using API.Dtos.Identity;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ValidationResult = API.Helpers.ValidationResult;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;

    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper, IConfiguration config)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _mapper = mapper;
        _config = config;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var user = await _userManager.FindUserByClaimsPrincipalEmailAsync(HttpContext.User);

        if (user == null) return NotFound(new ApiResponse(HttpStatusCode.NotFound));

        return Ok(new UserDto(user.Email, user.DisplayName, user.PhoneNumber,
            _mapper.Map<Address, AddressDto>(user.Address), _tokenService.CreateToken(user)));
    }

    [HttpGet("emailNotInUse")]
    public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return Ok(user == null);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _userManager.FindUserByClaimsPrincipalEmailAsync(HttpContext.User);

        if (user == null) return NotFound(new ApiResponse(HttpStatusCode.NotFound));

        if (user.Address == null) return NoContent();

        return Ok(_mapper.Map<Address, AddressDto>(user.Address));
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress([FromBody] AddressDto address)
    {
        var user = await _userManager.FindUserByClaimsPrincipalEmailAsync(HttpContext.User);

        if (user == null) return NotFound(new ApiResponse(HttpStatusCode.NotFound));

        user.Address = _mapper.Map<AddressDto, Address>(address);
        var result = await _userManager.UpdateAsync(user);

        return result.Succeeded
            ? Ok(_mapper.Map<Address, AddressDto>(user.Address))
            : new ObjectResult(new ApiResponse(HttpStatusCode.InternalServerError));
    }


    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        // Validate
        var validationResult = await Validate(registerDto);
        if (!validationResult.Success)
        {
            return BadRequest(new ApiValidationErrorResponse(validationResult.ErrorMessages));
        }

        //
        var user = new AppUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
            PhoneNumber = registerDto.PhoneNumber,
        };
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new ApiValidationErrorResponse(result.Errors.Select(identityError => identityError.Description)));
        }

        var token = new UserDto(user.Email, user.DisplayName, user.PhoneNumber,
            _mapper.Map<Address, AddressDto>(user.Address), _tokenService.CreateToken(user));
        return Ok(token);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindUserByEmailAsync(loginDto.Email);
        
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
                var token = new UserDto(user.Email, user.DisplayName, user.PhoneNumber,
                    _mapper.Map<Address, AddressDto>(user.Address), _tokenService.CreateToken(user));
                return Ok(token);
            }
        }
    }

    private async Task<ValidationResult> Validate(RegisterDto registerDto)
    {
        var errorMessages = new List<string>();

        var existingUser =  await _userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            errorMessages.Add(_config["Messages:ErrorMessage:DuplicateEmail"]);
        }

        return errorMessages.Count == 0 ? new ValidationResult(true) : new ValidationResult(false, errorMessages);
    }
}