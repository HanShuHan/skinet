using System.Net;
using API.Errors;
using API.Extensions;
using Core.Entities.BasketAggregate;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController : BaseApiController
{
    private readonly IPaymentService _paymentService;
    private readonly UserManager<AppUser> _userManager;

    public PaymentsController(IPaymentService paymentService, UserManager<AppUser> userManager)
    {
        _paymentService = paymentService;
        _userManager = userManager;
    }

    [HttpPost("{basketId}")]
    public async Task<ActionResult<SimpleBasket>> CreatePaymentIntent(string basketId)
    {
        var simpleBasket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

        return (simpleBasket == null)
            ? BadRequest(new ApiResponse(HttpStatusCode.BadRequest, null, "the basket cannot be found"))
            : Ok(simpleBasket);
    }

    [Authorize]
    [HttpPut("{basketId}")]
    public async Task<ActionResult<SimpleBasket>> UpdatePaymentIntent(string basketId)
    {
        var user = await _userManager.FindUserByClaimsPrincipalEmailAsync(HttpContext.User);
        var updatedSimpleBasket = await _paymentService.CreateOrUpdatePaymentIntent(basketId, user);

        return (updatedSimpleBasket == null)
            ? BadRequest(new ApiResponse(HttpStatusCode.BadRequest, null, "the basket cannot be found"))
            : Ok(updatedSimpleBasket);
    }
}